import { GameWindow } from "./gamewindow";
import { ErrorCode } from "./logging";
import { Log, LogDebug, LogError } from "./logging/errorsystem";
import { MessageSystem } from "./messagesystem";

export enum Client {
    CLI, // Mocha tests
    Browser, // Web
    Electron // Desktop
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
        public title: string = "",
        public height: number = 0,
        public width: number = 0,
        public fps: number = 60,
        public rootElementId: string = "",
        public debug: boolean = false
    ) {
        this.title = title;
        this.height = height;
        this.width = width;
        this.fps = fps;
        this.rootElementId = rootElementId;
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
    private _container: HTMLElement | null = null;
    private _engineArguments: EngineArguments = new EngineArguments();
    private _messageSystem: MessageSystem;
    private _client: Client;
    private _fps: number = 0;
    private _framesThisSecond: number = 0;
    private _now: number = 0;
    private _last: number = 0;
    private _height: number = 0;
    private _startTime: number;
    private _width: number = 0;
    private _gameWindow: GameWindow | undefined = undefined;
    public static get instance(): Engine | undefined {
        if (Engine._instance !== undefined) {
            return Engine._instance;
        }
        LogError(ErrorCode.EngineInstanceNull, "Called on get Engine.instance");
        return undefined; 
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
    public static get now(): number {
        return Engine._instance!._now;
    }
    /**
     * Gets the current game window's height.
     * @returns number
     */
    public static get height(): number {
        return this._instance!._height;
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
     * Gets the engines current GameWindow object.
     * @returns GameWindow
     */
    public get gameWindow(): GameWindow | undefined {
        if (this._gameWindow) return this._gameWindow;
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
        // Set Client TODO: should this be in a build script?
        this._client = Client.Browser; // Always CLI first
        if (typeof(window) !== "undefined") { // There is a window; we are in the browser
            const w = (window as any);
            if (w.process !== undefined && w.process.versions !== undefined 
                && w.process.versions.electron !== undefined) {
                this._client = Client.Electron;
            }
        }
        if (typeof(document) === "undefined") {
            LogError(ErrorCode.DocumentUndefined, "Document has not been defined");
        } else {
            if (typeof(document) !== "undefined" && this._client === Client.Browser) {
                if (args.rootElementId !== "") this._container = document.getElementById(args.rootElementId);
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
        new Engine(args);
        GameWindow.start(this._instance!);
        GameWindow.title = args.title;
        Engine._running = true;
        Log("Engine started");
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
        Engine._instance!.frame(); // Call the first frame update
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
     * Main game loop.
     * @returns void
     */
    public frame(): void {
        if (!Engine._running) {
            return;
        } else {
            this._now = this.timestamp();
            if (this._now > (this._last + 1000)) { // update every second
                this._fps = 0.25 * this._framesThisSecond; // new FPS
                let delta: number = (this._now - this._last) / 1000;
                this.update(delta);
                this._last = this._now;
                this._framesThisSecond = 0;
            }
            this._framesThisSecond++;
            // requestAnimationFrame(this.frame.bind(this));
        }
    }
    /**
     * Main update loop. Calls all other system updates.
     * @returns void
     */
    public update(delta: number): void {
        Log(`Update loop | delta = ${delta}`);
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