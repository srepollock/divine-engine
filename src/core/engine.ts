import { GameWindow } from "./gamewindow";
import { Client } from "./helperfunctions";
import { ErrorCode } from "./logging";
import { Log, LogCritical, LogError } from "./logging/errorsystem";
import { MessageSystem } from "./messagesystem/messagesystem";
import { RenderSystem } from "./render/rendersystem";
import { Scene } from "./scene";
import { BaseSceneManager, SceneManager } from "./SceneManager";
import { Window } from "./window";
/**
 * Engine arguments for setup.
 */
export class EngineArguments {
    public title: string;
    public height: number;
    public width: number;
    public fps: number;
    public rootElementId: string;
    // NOTE: If left blank, the BaseSM is used, otherwise use sm passed in
    public sceneManager: SceneManager | undefined;
    // NOTE: If left blank, the default scene is used and will run.
    // NOTE:REVIEW: Relative path?
    public scene: string;
    public debug: boolean;
    /**
     * Engine arguments for a base setup. When defining engine parameters, using
     * this object and setting it in a project can provide quick initialization.
     * **Default arguments are defined.**
     * @param  {string=""} publictitle
     * @param  {number=0} publicheight
     * @param  {number=0} publicwidth
     * @param  {number=60} publicfps
     * @param  {string=""} publicrootElementId
     * @param  {boolean=false} publicdebug
     */
    constructor({title, height, width, fps, rootElementId, sceneManager, scene, debug}: {
            title?: string,
            height?: number,
            width?: number,
            fps?: number,
            rootElementId?: string,
            sceneManager?: SceneManager,
            scene?: string,
            debug?: boolean
        } = {}
    ) {
        this.title = (title) ? title : "";
        this.height = (height ? height : 0);
        this.width = (width) ? width : 0;
        this.fps = (fps) ? fps : 60;
        this.rootElementId = (rootElementId) ? rootElementId : "";
        this.sceneManager = (sceneManager) ? sceneManager : undefined; /*
             REVIEW: This scenemanager will be their own how? */
        this.scene = (scene) ? scene : "";
        this.debug = (debug) ? debug : false;
    }
    public toString(): string {
        return JSON.stringify(`${this.title}, ${this.width}x${this.height}, ${this.fps}, ${this.sceneManager}`);
    }
}

/**
 * The Divine Game Engine class.
 */
export class Engine {
    // TODO: Sort this alphabetically
    private static _instance: Engine | undefined = undefined;
    private static _started: boolean = false;
    private static _running: boolean = false;
    private static _exit: boolean = false;
    private _container: HTMLElement | null = null;
    private _engineArguments: EngineArguments = new EngineArguments();
    private _client: Client;
    private _fps: number = 0;
    private _framesThisSecond: number = 0;
    private _now: number = 0;
    private _last: number = 0;
    private _height: number = 0;
    private _scene: Scene | undefined = undefined;
    private _sceneManager: SceneManager | undefined = undefined;
    private _startTime: number;
    private _renderSystem: RenderSystem | undefined = undefined;
    private _width: number = 0;
    private _gameWindow: GameWindow | undefined = undefined;
    /**
     * Gets the engine's client type.
     * @returns Client
     */
    public static get client(): Client {
        return Engine._instance!.client;
    }
    /**
     * Get's the engine's exit variable.
     * @returns boolean
     */
    public static get exit(): boolean {
        return Engine._exit;
    }
    /**
     * Gets the current game window's height.
     * @returns number
     */
    public static get height(): number {
        return this._instance!._height;
    }
    /**
     * Get the engine's instance.
     * @returns Engine
     */
    public static get instance(): Engine {
        if (Engine._instance !== undefined) {
            return Engine._instance;
        }
        LogError(ErrorCode.EngineInstanceNull, "Called on get Engine.instance");
        throw ErrorCode.EngineInstanceNull;
    }
    /**
     * Gets the engine's current time.
     * @returns number
     */
    public static get now(): number {
        return Engine._instance!._now;
    }
    /**
     * Gets the engine's running variable.
     * @returns boolean
     */
    public static get running(): boolean {
        return Engine._running;
    }
    /**
     * Gets the engine's started variable.
     * @returns boolean
     */
    public static get started(): boolean {
        return Engine._started;
    }
    /**
     * Gets the current game window's width.
     * @returns number
     */
    public static get width(): number {
        return this._instance!._width;
    }
    /**
     * Returns game client
     * @returns Client
     */
    public get client(): Client {
        return this._client;
    }
    /**
     * Returns the HTMLElement (or the contianer) for the game.
     * @returns HTMLElement
     */
    public get container(): HTMLElement | null {
        return Engine._instance!._container;
    }
    /**
     * Sets the engine's arguments
     * @param  {EngineArguments} engineArguments
     * @returns EngineArguments
     */
    public set engineArguments(engineArguments: EngineArguments) {
        this._engineArguments = engineArguments;
    }
    /**
     * Returns this engine's arguements
     * @returns EngineArguments
     */
    public get engineArguments(): EngineArguments {
        return this._engineArguments;
    }
    /**
     * Gets the engines current GameWindow object.
     * @returns GameWindow
     */
    public get gameWindow(): Window {
        if (this._gameWindow) return this._gameWindow;
        LogError(ErrorCode.EngineWindowUndefined, 
            "The engine's game window is not defined");
        throw ErrorCode.EngineWindowUndefined;
    }
    /**
     * Sets the engine's game window
     * @param  {GameWindow} gw
     */
    public set gameWindow(gw: Window) {
        this._gameWindow = gw as GameWindow;
    }
    /**
     * Get's the engine's Render System
     * @returns RenderSystem
     */
    public get renderSystem(): RenderSystem {
        if (this._renderSystem !== undefined) {
            return this._renderSystem;
        }
        LogCritical(ErrorCode.RenderSystemUndefined, "Render system is undefined");
        throw ErrorCode.RenderSystemUndefined;
    }
    /**
     * Returns current scene
     * @returns Scene
     */
    public get scene(): Scene {
        if (this._scene !== undefined) {
            return this._scene;
        }
        LogError(ErrorCode.SceneUndefined, "Scene is undefined");
        throw ErrorCode.SceneUndefined;
    }
    /**
     * Gets the scene manager.
     * @returns SceneManager
     */
    public get sceneManager(): SceneManager {
        if (this._sceneManager !== undefined) return this._sceneManager;
        else {
            LogCritical(ErrorCode.SceneManagerUndefined, "Engine's scene manager is not defiend when calling get"
                + " function.");
            throw ErrorCode.SceneManagerUndefined;
        }
    }
    /**
     * Sets the engines scene manager
     * @param  {SceneManager} SceneManager
     */
    public set sceneManager(sceneManager: SceneManager) {
        this._sceneManager = sceneManager;
    }
    /**
     * Initializes an Engine object.
     */
    private constructor(args: EngineArguments) {
        this.setEngineArguments(args);
        MessageSystem.initialize();
        if (MessageSystem.instance === undefined) {
            // NOTE: Because the message system is so critical, it must be started if the engine is to run.
            LogError(ErrorCode.MessageSystemInitialization);
            Engine._exit = true;
        }
        if (Engine._instance !== undefined) {
            (ErrorCode.EngineInstanceNotNull, 
                "Engine already has an instance in the class");
            Engine._exit = true; // NOTE: Immediately close
        }
        if (!Engine._started) {
            LogError(ErrorCode.EngineStartedEarly, 
                "The engine instance must be started from the start function");
            Engine._exit = true;
        }
        Engine._instance = this;
        // Set Client NOTE: should this be in a build script?
        this._client = Client.Console; // Always CLI first
        if (typeof(window) !== "undefined") { // There is a window; we are in the browser
            const w = (window as any);
            if (w.process !== undefined && w.process.versions !== undefined 
                && w.process.versions.electron !== undefined) {
                this._client = Client.Electron;
            }
            if (typeof(document) !== "undefined") {
                this._client = Client.Browser;
                if (args.rootElementId !== "") this._container = document.getElementById(args.rootElementId); 
                // TODO: Container is not being set...
                else this._container = document.getElementsByTagName("body")[0];
            }
        }
        this._startTime = Date.now();
        this._last = this._startTime;
    }
    /**
     * This is the both the intialization and startup of the game engine. The
     * engine can only be setup and started through this function.
     * @param  {EngineArguments} args
     * @param  {()=>void} mainLoop
     * @returns void
     */
    public static start(args: EngineArguments): void {
        Engine._started = true;
        Log(args.toString());
        new Engine(args);
        Engine.instance.gameWindow = new GameWindow(Engine.instance.client);
        Engine.instance.gameWindow.start(this.instance.container!);
        Engine.instance.gameWindow.title = args.title;
        Engine._running = true;
        Log("Engine started");
        /**
         * NOTE: Start subsystems. This is where the rest of the systems `.start()` functions get called. 
         * REVIEW: Message system started in Constructor
         * They are held in reference by the engine. As it will shut everything down as well.
         */
        // Render System
        this.instance._renderSystem = new RenderSystem(args.width, args.height); // REVIEW: This is subject to change
        this.instance._renderSystem.initialize();
        // REVIEW: Load files in from relative path?
        // Scene Manager
        
        Log("before");
        // NOTE: Default BaseSceneManager is defined in default EngineArguments
        // NOTE: Always use the initial scene defined.
        if (Engine.instance.engineArguments.sceneManager !== undefined) {
            Engine.instance.sceneManager = Engine.instance.engineArguments.sceneManager;
        } else {
            Engine.instance.sceneManager = new BaseSceneManager();
        }
        // NOTE: If/else the scene is defined.
        (Engine.instance.engineArguments.scene !== "") ? 
            Engine.instance._scene = Engine.instance.sceneManager.loadScene(Engine.instance.engineArguments.scene) :
            Engine.instance._scene = Engine.instance.sceneManager.loadScene(Engine.instance.engineArguments.scene);
        Log("after");
        // 
        Engine.play();
    }
    /**
     * This stops the engine and calls the shutdown. Once the engine is stopped
     * a new engine will need to be setup through the start function.
     * @see Engine.start
     * @returns void
     */
    public static stop(): void {
        Engine._running = false;
    }
    /**
     * Begins running the engine.
     * @returns void
     */
    public static play(): void {
        if (!Engine._running && Engine._instance!._engineArguments !== undefined) {
            Engine.start(this._instance!._engineArguments); // Restart the engine
        }
        Engine._running = true; // Start running
        Engine._instance!._last = this._instance!.timestamp(); // Sets the last timestep to now (for the first frame)
        // Call the first frame update - End of the function
        if (this.client === Client.Browser) Engine._instance!.browserFrame();
        else if (this.client === Client.Electron) Engine._instance!.electronFrame();
        else if (this.client === Client.Console) Engine._instance!.consoleFrame();
        else LogError(ErrorCode.EngineClientNotSet, "Client has not been set by the engine.");
    }
    /**
     * Pauses the engine running.
     * @returns void
     */
    public static pause(): void {
        Engine._running = false;
    }
    /**
     * Shutsdown the engine completely. The entire application should close on 
     * this call.
     * @returns void
     */
    public static shutdown(): void {
        Engine.instance.cleanup();
        Engine._started = false;
        Engine._exit = true;
        if (Engine._instance!._client === Client.Electron) {
            const remote = require("electron").remote;
            const win = remote.getCurrentWindow();
            win.close();
        }       
        this._instance = undefined;
    }
    /**
     * Call's system shutdown files.
     * Call in reverese order of startup.
     * @returns void
     */
    public cleanup(): void {
        try {
            Engine.instance.sceneManager.shutdown();
            MessageSystem.instance!.shutdown();
            Engine.instance.renderSystem.shutdown();
        } catch (e) {
            console.trace(e);
            LogCritical(ErrorCode.EngineCleanupFailed, `Cleanup on ${this} failed`);
        }
    }
    /**
     * Main update loop. Calls all other system updates.
     * @returns void
     */
    private update(delta: number): void {
        /**
         * NOTE:
         * Wait for message worker
         * 
         */
        // LogDebug(`Update loop | delta = ${delta}`);
        this._renderSystem!.update(delta); // NOTE: Possibly undefined is handled on creation.
        // this._ioSystem.update(delta); // NOTE: IO messages
        // this._scene.update(delta); // NOTE: Calls scene update
        // this._physicsSystem.update(delta); // NOTE: Physics messages handled
        // this._soundSystem.update(delta); // NOTE: Sound messages handled
        // this._renderSystem.update(delta); // NOTE: Render system udpated.
    }
    /**
     * 3 Game loops??
     * There are 3 game loops in this engine for the purposes of unit testing and multiple client usage. As this engine
     * will be run in different environments, I want to set it up to unit test in each and different clients use
     * different loops. So there.
     * TODO: Update this discription before release.
     */
    /**
     * Browser game loop.
     * @returns void
     */
    private browserFrame(): void {
        if (!Engine._running) return;
        else {
            this._now = this.timestamp();
            if (this._now > (this._last + 1000)) { // update every second
                this._fps = 0.25 * this._framesThisSecond; // new FPS
                let delta: number = (this._now - this._last) / 1000;
                this.update(delta);
                this._last = this._now;
                this._framesThisSecond = 0;
            }
            this._framesThisSecond++;
            requestAnimationFrame(this.browserFrame.bind(this));
        }
    }
    /**
     * Electron game loop.
     * @returns void
     */
    private electronFrame(): void {
        if (!Engine._running) return;
        else {
            this._now = this.timestamp();
            if (this._now > (this._last + 1000)) { // update every second
                this._fps = 0.25 * this._framesThisSecond; // new FPS
                let delta: number = (this._now - this._last) / 1000;
                this.update(delta);
                this._last = this._now;
                this._framesThisSecond = 0;
            }
            this._framesThisSecond++;
            window.requestAnimationFrame(this.browserFrame.bind(this));
        }
    }
    /**
     * Gets the hour time in milliseconds.
     * @returns number
     */
    private hrtimeMs(): number {
        let time = process.hrtime();
        return time[0] * 1000 + time[1] / 1000000;
    }
    /**
     * Console game loop.
     * @returns void
     */
    private consoleFrame(): void {
        if (!Engine._running) return;
        else {
            // setTimeout(this.consoleFrame, 1000 / this._fps);
            setTimeout(() => this.consoleFrame(), 1000 / this._fps); // NOTE: Goes infinite unless stopped externally
            this._now = this.hrtimeMs();
            let delta = (this._now - this._last) / 1000;
            this.update(delta); // game logic would go here
            this._last = this._now;
        }
    }
    /**
     * Sets the engine arguments to the engine. This is setup at initial run
     * and saved in the engine for restarting the engine.
     * @param  {EngineArguments} args
     * @returns void
     */
    private setEngineArguments(args: EngineArguments): void {
        this._engineArguments = args;
        this._fps = this._engineArguments.fps;
    }
    /**
     * Gets the current timestamp.
     * @returns number
     */
    private timestamp(): number {
        return new Date().getTime();
    }
}