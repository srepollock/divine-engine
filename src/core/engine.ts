import { ErrorCode, log, LogLevel } from "./loggingsystem";

export class Engine {
    private static _instance: Engine | undefined;
    private _running: boolean = false;
    private _started: boolean = false;
    private _delta: number = -1;
    private _lastTime: number = 0;
    public static get instance(): Engine {
        if (Engine._instance === undefined) {
            throw new Error("Engine has not been defined. Something went horribly wrong.");
        }
        return Engine._instance;
    }
    public get delta(): number {
        return Engine.instance._delta;
    }
    public get running(): boolean {
        return Engine.instance._running;
    }
    public get started(): boolean {
        return Engine.instance._started;
    }
    private constructor() {
        if (Engine._instance !== undefined) {
            log(LogLevel.error, 
                "Engine has already been defined. Be sure you're not running another instance already",
                ErrorCode.EngineInstanceNotNull);
            return;
        }
        Engine._instance = this;
        Engine.instance._lastTime = Date.now();
        Engine.instance._delta = Date.now();
    }
    public static pause(): void {
        Engine.instance._running = false;
    }
    public static play(): void {
        Engine.instance._running = true;
    }
    public static start(): void {
        new Engine();
        Engine.instance._started = true;
        Engine.instance._running = true;
        Engine.instance.loop();
    }
    public static stop(): void {
        Engine.instance._started = true;
        Engine.instance._running = true;
        Engine.instance.shutdown();
    }
    private cleanup() {
        
    }
    private loop(): void {
        if (Engine.instance._started) {
            if (Engine.instance._running) {
                this.update();
            }
            requestAnimationFrame(this.loop.bind(this));
        }
    }
    private shutdown(): void {
        Engine.instance.cleanup();
        Engine._instance = undefined; // Last line of this function.
    }
    private update(): void {
        Engine.instance._delta = Date.now() - Engine.instance._lastTime;
        Engine.instance._lastTime = Date.now();
        log(LogLevel.debug, `Delta is: ${Engine.instance.delta}`);
    }
}