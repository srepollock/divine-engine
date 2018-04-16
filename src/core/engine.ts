import { EngineConfiguration } from "./engineconfiguration";
import { ErrorCode, LogError, LogInfo } from "./logging";
import { GameWindow } from "./gamewindow";

export class EngineArguments {
    constructor(
        public height: number = 0, 
        public width: number = 0
    ) {
        this.height = height;
        this.width = width;
    }
}

export class Engine {
    private _started: boolean = false;
    private _running: boolean = false;
    private _exit: boolean = false;
    private _height: number = 0;
    private _width: number = 0;
    private _window: GameWindow | undefined = undefined;
    public get started(): boolean {
        return this._started;
    }
    public get running(): boolean {
        return this._running;
    }
    public get exit(): boolean {
        return this._exit;
    }
    public get height(): number {
        return this._height;
    }
    public get width(): number {
        return this._width;
    }
    public get window(): GameWindow | undefined {
        if (this._window) return this._window;
        LogError(ErrorCode.EngineWindowUndefined, 
            "The engine's game window is not defined");
        return undefined;
    }
    public constructor(args: EngineArguments) {
        this._height = args.height;
        this._width = args.width;
    }
    public start(): void {
        this._started = true;
        if (!this._window) LogError(ErrorCode.EngineWindowUndefined, 
            "The engine's game window is not defined");
        this._running = true;
    }
    public update(): void {

    }
    public stop(): void {
        this._exit = true;
    }
    public resize(height:number, width:number): void {
        if(this._window) {
            this._height = height;
            this._width = width;
            this._window.resize(this._height, this._width);
        } else {
            LogError(ErrorCode.EngineWindowUndefined, 
                "The engine's game window is not defined");
        }
    }
}

export default Engine;