import { AssetManager } from "../assets/assetmanager";
import { AIMovementBehaviourBuilder } from "../behaviours/aimovementbehaviourbuilder";
import { BehaviourManager } from "../behaviours/behaviourmanager";
import { FlagBehaviourBuilder } from "../behaviours/flagbehaviourbuilder";
import { KeyboardMovementBehaviourBuilder } from "../behaviours/keyboardmovementbehaviourbuilder";
import { PlayerBehaviourBuilder } from "../behaviours/playerbehaviourbuilder";
import { RotationBehaviourBuilder } from "../behaviours/rotationbehaviourbuilder";
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
import { Sprite } from "../rendersystem/sprite";
import { AudioManager } from "../soundsystem/audiomanager";
import { ZoneManager } from "../zones/zonemanager";
import { ErrorCode, log, LogLevel } from "./loggingsystem/src";
import { MessageType } from "./messagesystem/messagetype";

export class Engine implements IMessageHandler {
    private static _instance: Engine;
    private _last: number = 0;
    private _framesThisSecond: number = 0;
    private _fps: number = -1;
    private _running: boolean = false;
    private _basicShader: BasicShader | null = null;
    private _sprite: Sprite | undefined;
    private _projection: Matrix4 | undefined;
    private _gameWidth?: number;
    private _gameHeight?: number;
    public static get instance(): Engine {
        return Engine._instance;
    }
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
        Engine._instance = this;
    }
    public static play(): void {
        Engine._instance._running = true;
        GLUtility.gl.clearColor(146 / 255, 206 / 255, 247 / 255, 1);
        GLUtility.gl.enable(GLUtility.gl.BLEND);
        GLUtility.gl.blendFunc(GLUtility.gl.SRC_ALPHA, GLUtility.gl.ONE_MINUS_SRC_ALPHA);
        Engine._instance!._last = performance.now();
        Engine._instance.loop();
    }
    public static start({assets, width, height}: {assets: any, width?: number, height?: number} = {assets: {}}): void {
        new Engine(width, height);
        Engine.instance._basicShader = new BasicShader();
        Engine.instance._basicShader.use();
        Engine.instance.loadAssets(assets);
        Engine.instance._projection = Matrix4.orthographic(0, GLUtility.instance.canvas.width, 0, 
            GLUtility.instance.canvas.height, -100.0, 100.0);
        ZoneManager.changeZone(0);
        Message.subscribe(MessageType.MOUSE_DOWN, Engine.instance);
        Engine.play();
    }
    public static stop(): void {
        Engine._instance._running = false;
        Engine._instance.shutdown();
    }
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
    public loop(): void {
        if (!Engine._instance._running) {
            console.warn("Enigne is not running. Please call start before running the loop.");
            return;
        }
        this.resize();
        let now = performance.now();
        if (now > (Engine._instance._last + 2000)) { // update every second
            Engine._instance._fps = 0.25 * Engine._instance._framesThisSecond; // new FPS
            console.debug(`FPS: ${Engine._instance!._fps}`);
            Engine._instance._last = now;
            Engine._instance._framesThisSecond = 0;
        }
        let delta: number = (now - Engine._instance!._last) / 1000;
        MessageBus.update(delta);
        ZoneManager.update(delta);
        CollisionManager.update(delta);
        Engine._instance.update(delta);
        Engine._instance._framesThisSecond++;
        requestAnimationFrame(this.loop.bind(this));
    }
    public update(delta: number): void {
        // console.log(`Delta: ${delta}`);
        GLUtility.gl.clear(GLUtility.gl.COLOR_BUFFER_BIT);
        ZoneManager.render(this._basicShader!);
        let projectionPosition = this._basicShader!.getUniformLocation("u_projection");
        GLUtility.gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection!.matrix));
        
    }
    public onMessage(message: Message): void {
        AudioManager.playSound("zone1");
    }
    private cleanup(): void  {
        this._sprite!.destroy();
    }
    private shutdown(): void {
        this.cleanup();
    }
}