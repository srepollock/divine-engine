import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { AssetManager } from "../assets/assetmanager";
import { AIMovementBehaviourBuilder } from "../behaviours/aimovementbehaviourbuilder";
import { BehaviourManager } from "../behaviours/behaviourmanager";
import { BossBehaviourBuilder } from "../behaviours/bosscontrollerbehavoiur";
import { DialogBehaviourBuilder } from "../behaviours/dialogbehaviour";
import { EnemyBehaviourBuilder } from "../behaviours/enemybehaviourbuilder";
import { FlagBehaviourBuilder } from "../behaviours/flagbehaviourbuilder";
import { GUIBehaviourBuilder } from "../behaviours/guibehaviourbuilder";
import { GUIButtonBehaviourBuilder } from "../behaviours/guibuttonbehaviourbuilder";
import { KeyboardMovementBehaviourBuilder } from "../behaviours/keyboardmovementbehaviourbuilder";
import { OpeningGUIBehaviourBuilder } from "../behaviours/openingguibehaviourbuilder";
import { PlayerBehaviourBuilder } from "../behaviours/playerbehaviourbuilder";
import { ProjectileBehaviourBuilder } from "../behaviours/projectilebehaviour";
import { RotationBehaviourBuilder } from "../behaviours/rotationbehaviourbuilder";
import { SequenceBehaviourBuilder } from "../behaviours/sequencebehaviourbuilder";
import { SoundBehaviourBuilder } from "../behaviours/soundbehaviourbuilder";
import { AnimatedSpriteComponentBuilder } from "../components/animatedspritecomponentbuilder";
import { CollisionComponentBuilder } from "../components/collisioncomponentbuilder";
import { ComponentManager } from "../components/componentmanager";
import { SpriteComponentBuilder } from "../components/spritecomponentbuilder";
import { Material } from "../core/material";
import { IMessageHandler } from "../core/messagesystem/imessagehandler";
import { Message } from "../core/messagesystem/message";
import { MessageBus } from "../core/messagesystem/messagebus";
import { InputManager } from "../inputsystem/inputmanager";
import { Matrix4 } from "../math/matrix4";
import { CollisionManager } from "../physicssystem/collisionmanager";
import { BasicShader } from "../rendersystem/basicshader";
import { Color } from "../rendersystem/color";
import { GLUtility } from "../rendersystem/glutility";
import { MaterialManager } from "../rendersystem/materialmanager";
import { AudioManager } from "../soundsystem/audiomanager";
import { ZoneManager } from "../zones/zonemanager";
import { MessageType } from "./messagesystem/messagetype";

export class Engine implements IMessageHandler {
    private static _instance: Engine;
    private _last: number = 0;
    private _startTime: number = 0;
    private _elapsed: number = 0;
    private _running: boolean = false;
    private _basicShader: BasicShader | null = null;
    private _projection: Matrix4 | undefined;
    private _gameWidth?: number;
    private _gameHeight?: number;
    /**
     * Gets the singleton object instance.
     * @returns Engine
     */
    public static get instance(): Engine {
        return Engine._instance;
    }
    /**
     * Class constructor.
     * @param  {number} width?
     * @param  {number} height?
     */
    private constructor(width?: number, height?: number) {
        GLUtility.initialize();
        if (!GLUtility.instance) {
            log(LogLevel.error, "GLUtility class was not initialized.", ErrorCode.GLUtilityNotInitialized);
        }
        this._gameWidth = width;
        this._gameHeight = height;
        this.resize();
        AssetManager.initialize();
        ZoneManager.initialize();
        InputManager.initialize();
        AudioManager.initialize();
        CollisionManager.initialize();
        ComponentManager.registerBuilder(new SpriteComponentBuilder());
        ComponentManager.registerBuilder(new AnimatedSpriteComponentBuilder());
        ComponentManager.registerBuilder(new CollisionComponentBuilder());

        BehaviourManager.registerBuilder(new RotationBehaviourBuilder());
        BehaviourManager.registerBuilder(new KeyboardMovementBehaviourBuilder());
        BehaviourManager.registerBuilder(new AIMovementBehaviourBuilder());
        BehaviourManager.registerBuilder(new FlagBehaviourBuilder());
        BehaviourManager.registerBuilder(new PlayerBehaviourBuilder());
        BehaviourManager.registerBuilder(new EnemyBehaviourBuilder());
        BehaviourManager.registerBuilder(new OpeningGUIBehaviourBuilder());
        BehaviourManager.registerBuilder(new GUIBehaviourBuilder());
        BehaviourManager.registerBuilder(new GUIButtonBehaviourBuilder());
        BehaviourManager.registerBuilder(new SequenceBehaviourBuilder());
        BehaviourManager.registerBuilder(new SoundBehaviourBuilder());
        BehaviourManager.registerBuilder(new DialogBehaviourBuilder());
        BehaviourManager.registerBuilder(new BossBehaviourBuilder());
        BehaviourManager.registerBuilder(new ProjectileBehaviourBuilder());
        Engine._instance = this;
    }
    /**
     * Exits from the engine.
     * @returns void
     */
    public static exit(): void {
        Engine._instance.shutdown();
        window.close();
        // REVIEW: Close the engine and the window.
    }
    /**
     * Plays the engine. Can be called after stop.
     * @returns void
     */
    public static play(): void {
        Engine._instance._running = true;
        GLUtility.gl.clearColor(146 / 255, 206 / 255, 247 / 255, 1);
        GLUtility.gl.enable(GLUtility.gl.BLEND);
        GLUtility.gl.blendFunc(GLUtility.gl.SRC_ALPHA, GLUtility.gl.ONE_MINUS_SRC_ALPHA);
        Engine._instance!._last = Date.now();
        Engine._instance!._startTime = Date.now();
        Engine._instance.loop();
    }
    /**
     * Starts the engine and begins playing right away.
     * Given in a destructured format.
     * @param  {} assets JSON assets to load. Can only be labels of materials, sounds and/or zones.
     * @param  {number} height>
     * @param  {number} width?
     * @returns void
     */
    public static start({assets, width, height}: {assets: any, width?: number, height?: number} = {assets: {}}): void {
        new Engine(width, height);
        Engine.instance._basicShader = new BasicShader();
        Engine.instance._basicShader.use();
        Engine.instance.loadAssets(assets);
        Engine.instance._projection = Matrix4.orthographic(0, GLUtility.instance.canvas.width, 0, 
            GLUtility.instance.canvas.height, -100.0, 100.0);
        ZoneManager.changeZone(16); // NOTE: Change here for scene testing
        Message.subscribe(MessageType.MOUSE_DOWN, Engine.instance);
        Engine.play();
    }
    /**
     * Stops the engine from running. No updates will be performed, must be handled by external Javascript or handlers.
     * @returns void
     */
    public static stop(): void {
        Engine._instance._running = false;
    }
    /**
     * Resizes the WebGL canvas.
     * @returns void
     */
    public resize(): void {
        if (GLUtility.instance.canvas !== undefined) {
            GLUtility.instance.canvas.width = (this._gameWidth !== undefined) ? this._gameWidth : window.innerWidth;
            GLUtility.instance.canvas.height = (this._gameHeight !== undefined) ? this._gameHeight : window.innerHeight;
            GLUtility.instance.canvas.style.width = `${this._gameWidth}px`;
            GLUtility.instance.canvas.style.height = `${this._gameWidth}px`;
            GLUtility.gl.viewport(0, 0, GLUtility.instance.canvas.width, GLUtility.instance.canvas.height);
            this._projection = Matrix4.orthographic(0, GLUtility.instance.canvas.width, 
                GLUtility.instance.canvas.height, 0, -100.0, 100.0);
        }
    }
    /**
     * Loads the assets given at engine instantiation.
     * @param  {any} assets
     * @returns void
     */
    public loadAssets(assets: any): void {
        if (assets.zones === undefined) {
            log(LogLevel.error, `No zones given. There were no zones given and therefore none to load.`, 
                ErrorCode.LoadAssetFailed);
        }
        (assets.zones as Array<Object>).forEach((a: any) => {
            if (a.path !== undefined) {
                ZoneManager.registerZone(String(a.path));
            }
        });
        if (assets.materials !== undefined) {
            (assets.materials as Array<Object>).forEach((a: any) => {
                if (a.name !== undefined && a.path !== undefined) {
                    MaterialManager.registerMaterial(new Material(String(a.name), String(a.path), Color.white));
                }
            });
        }
        if (assets.sounds !== undefined) {
            (assets.sounds as Array<Object>).forEach((a: any) => {
                if (a.name !== undefined && a.path !== undefined) {
                    AudioManager.loadSoundFile(String(a.name), String(a.path), (a.loop !== undefined) ? a.loop : false);
                }
            });
        }
    }
    /**
     * Main game loop. This calls all necessary update functions.
     * // REVIEW: Updated the engine to use FPS controlled loops
     * @returns void
     */
    public loop(): void {
        if (!Engine._instance._running) {
            console.warn("Enigne is not running. Please call start before running the loop.");
            return;
        }
        this.resize();
        let now = Date.now();
        Engine.instance._elapsed = Math.floor(now - Engine._instance._startTime) / 1000;
        let delta = Math.floor(now - Engine._instance._last) / 1000;
        Engine._instance._last = now;
        MessageBus.update(delta);
        ZoneManager.update(delta);
        CollisionManager.update(delta);
        Engine._instance.update(delta);
        requestAnimationFrame(this.loop.bind(this));
    }
    /**
     * Updates the engine and the current zone.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        // log(LogLevel.debug, `Delta: ${delta}`);
        GLUtility.gl.clear(GLUtility.gl.COLOR_BUFFER_BIT);
        ZoneManager.render(this._basicShader!);
        let projectionPosition = this._basicShader!.getUniformLocation("u_projection");
        GLUtility.gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection!.matrix));
        
    }
    /**
     * Engine message handler.
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        if (message.code === MessageType.EXIT) {
            Engine.exit();
        }
    }
    /**
     * Cleansup the engine.
     * @returns void
     */
    private cleanup(): void  {
        this._running = false;
        setTimeout(() => {}, 5000);
    }
    /**
     * Shutsdown the engine. Called on exit.
     * @returns void
     */
    private shutdown(): void {
        this.cleanup();
    }
}