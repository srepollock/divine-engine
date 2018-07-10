import { GameWindow } from "./gamewindow";
import { ErrorCode } from "./logging";
import { Log, LogDebug, LogError, LogInfo } from "./logging/errorsystem";
import { MessageSystem } from "./messagesystem";

export enum Client {
    Browser,
    Electron,
    Angular
}

/**
 * Engine arguments for setup.
 */
export class EngineArguments {
    /**
     * Engine arguments for a base setup. When defining engine parameters, using
     * this object and setting it in a project can provide quick initialization.
     * **Default arguments are defined.**
     * @param height 
     * @param width 
     */
    constructor(
        public height: number = 0,
        public width: number = 0,
        public fps: number = 60,
        public debug: boolean = false
    ) {
        this.height = height;
        this.width = width;
        this.fps = fps;
        this.debug = debug;
    }
}

/**
 * The Game Engine class.
 */
export class Engine {
    private static _instance: Engine | undefined = undefined;
    private static _started: boolean = false;
    private static _running: boolean = false;
    private static _exit: boolean = false;
    private _engineArguments: EngineArguments = new EngineArguments();
    private _messageSystem: MessageSystem;
    private _client: Client;
    private _fps: number = 0;
    private _now: number = 0;
    private _last: number = 0;
    private _height: number = 0;
    private _startTime: number;
    private _width: number = 0;
    private _window: GameWindow | undefined = undefined;
    public static get instance(): Engine | undefined {
        return Engine._instance;
    }
    /**
     * Gets the engine's started variable.
     * @returns boolean
     */
    public static get started(): boolean {
        return Engine._started;
    }
    /**
     * Gets the engine's running variable.
     * @returns boolean
     */
    public static get running(): boolean {
        return Engine._running;
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
        if (this._instance) return this._instance._height;
        else return -1;
    }
    /**
     * Gets the current game window's width.
     * @returns number
     */
    public static get width(): number {
        if (this._instance) return this._instance._width;
        else return -1;
    }
    /**
     * Gets the engines current window object.
     * @returns GameWindow
     */
    public get window(): GameWindow | undefined {
        if (this._window) return this._window;
        LogError(ErrorCode.EngineWindowUndefined, 
            "The engine's game window is not defined");
        return undefined;
    }
    /**
     * Initializes an Engine object.
     */
    private constructor(args: EngineArguments) {
        this.setEngineArguments(args);
        this._messageSystem = new MessageSystem();
        if (this._messageSystem === undefined) {
            LogError(ErrorCode.MessageSystemInitialization);
            Engine._exit = true;
        }
        if (Engine._instance === undefined) {
            (ErrorCode.EngineInstanceNotNull, 
                "Engine already has an instance in the class");
            Engine._exit = true; // NOTE: Immediately close
        }
        if (!Engine._started) {
            LogError(ErrorCode.EngineStartedEarly, 
                "The engine instance must be started from the start function");
        }
        Engine._instance = this;
        this._client = Client.Browser;
        if (typeof(window) !== undefined) {
            const w = (window as any);
            if (w.process !== undefined && w.process.versions !== undefined 
                && w.process.versions.electron !== undefined) {
                this._client = Client.Electron;
            }
        }
        this._startTime = Date.now();
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
        new Engine(args);

        Engine._running = true;
        LogInfo("Engine started");
        Engine.play();
    }
    /**
     * This stops the engine and calls the shutdown. Once the engine is stopped
     * a new engine will need to be setup through the start function.
     * @see Engine.start
     * @returns void
     */
    public static stop(): void {
        if (this._instance !== undefined) {
            Engine._exit = true;
            Engine._running = false;
            Engine._started = false;
            LogDebug("Engine is stopping.");
        }
    }
    /**
     * Begins running the engine.
     * @returns void
     */
    public static play(): void {
        if (!Engine._running) {
            LogError(ErrorCode.EngineNotRunning);
            return;
        }
        Engine._instance!.frame();
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
        this.stop();
        if (Engine._instance!._client === Client.Electron) {
            const remote = require("electron").remote;
            const win = remote.getCurrentWindow();
            win.close();
        }       
        this._instance = undefined;
    }
    /**
     * Main game loop.
     * @returns void
     */
    public frame(): void {
        if (Engine._running) {
            Engine._instance!._now = this.timestamp();
            let delta: number = (Engine._instance!._now - 
                Engine._instance!._last) / 1000;
            this.update(delta);
            Engine._instance!._last = Engine._instance!._now;
            this.frame();
        }
    }
    /**
     * Main update loop. Calls all other system updates.
     * @returns void
     */
    public update(delta: number): void {
        Log("Update loop");
        // TODO: Implement the systems and uncomment here
        // this.ioSystem.update(delta); // NOTE: IO messages
        // this.sceneManager.update(delta); // NOTE: Calls scene update
        // this.physicsSystem.update(delta); // NOTE: Physics messages handled
        // this.soundSystem.update(delta); // NOTE: Sound messages handled
        // this.renderSystem.update(delta); // NOTE: Render system udpated.
        // NOTE: How do I do this?
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
    private timestamp(): number {
        return new Date().getTime();
    }
}