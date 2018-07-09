import { GameWindow } from "./gamewindow";
import { ErrorCode } from "./logging";
import { LogDebug, LogError, LogInfo } from "./logging/errorsystem";
import { MessageSystem } from "./messagesystem";

/**
 * Engine arguments for setup.
 */
export class EngineArguments {
    /**
     * Engine arguments for a base setup. When defining engine parameters, using
     * this object and setting it in a project can provide quick initialization.
     * @param height 
     * @param width 
     */
    constructor(
        public height: number = 0,
        public width: number = 0
    ) {
        this.height = height;
        this.width = width;
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
    private messageSystem: MessageSystem;
    private _height: number = 0;
    private _width: number = 0;
    private _window: GameWindow | undefined = undefined;
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
    private constructor() {
        this.messageSystem = new MessageSystem();
        if (this.messageSystem === undefined) {
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
    }
    /**
     * This is the both the intialization and startup of the game engine. The
     * engine can only be setup and started through this function.
     * @param  {EngineArguments} args
     * @param  {()=>void} mainLoop
     * @returns void
     */
    public static start(args: EngineArguments, ready: () => void): void {
        Engine._started = true;
        new Engine();

        Engine._running = true;
        LogInfo("Engine started");
        ready();
    }
    public static update(): void {
        LogDebug("Engine is running");
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
            Engine.shutdown();
        }
    }
    /**
     * Resizes the game window. The engine has full control over the game window
     * and will be used as an intermediary between the game window and function
     * calls by developers.
     * @param  {number} height
     * @param  {number} width
     * @returns void
     */
    public static resize(height: number, width: number): void {
        if (this._instance) {
            if (this._instance._window) {
                this._instance._height = height;
                this._instance._width = width;
                this._instance._window.resize(this._instance._height, 
                    this._instance._width);
            } else {
                LogError(ErrorCode.EngineWindowUndefined,
                    "The engine's game window is not defined");
            }
        } else {
            LogError(ErrorCode.EngineInstanceNull, 
                "The engine's instance is set to null");
        }
    }
    /**
     * Set's the engines instance as undefined. This is internally called by the
     * engine's stop function.
     * @returns void
     */
    private static shutdown(): void {
        this._instance = undefined;
    }
}