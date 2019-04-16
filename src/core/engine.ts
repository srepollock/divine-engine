import { ErrorCode, log, LogLevel } from "./loggingsystem";

export class Engine {
    private static _instance: Engine | undefined;
    private static _secondToNano: number = 1e9;
    private static _nanoToSecond: number = 1 / Engine._secondToNano;
    private static _milisecondToNano: number = 1e6;
    private _activeLoops: Array<number> = Array<number>();
    private _loopId: number = -1;
    private _running: boolean = false;
    private _started: boolean = false;
    private _delta: number = -1;
    private _frame: number = 0;
    public static get instance(): Engine {
        if (Engine._instance === undefined) {
            throw new Error("Engine has not been defined. Something went horribly wrong.");
        }
        return Engine._instance;
    }
    public get delta(): number {
        return Engine.instance._delta;
    }
    public get frame(): number {
        return Engine.instance._frame;
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
        Engine.instance._loopId = Engine.instance.startGameLoop(Engine.instance.update);
    }
    public static stop(): void {
        Engine.instance._started = false;
        Engine.instance._running = false;
        Engine.instance.shutdown();
    }
    private cleanup() {
        if (Engine.instance._loopId !== -1 && Engine.instance._activeLoops.length !== 0) {
            Engine.instance.clearGameLoop(Engine.instance._loopId);
            setTimeout(() => {}, 1000);
            if (Engine.instance._activeLoops.length !== 0) {
                // DEBUG: This is failing; needs to be addressed.
                // tslint:disable-next-line: max-line-length
                log(LogLevel.critical, "Engine loop failed critically. The loops are still running after waiting. This may be a memory leak and needs to be addressed asap.", ErrorCode.EngineCleanupFailed);
            }
        }
    }
    /**
     * Remove the loop id from the active loops. There should only ever be 1 loop running at a time.
     * @param  {number} loopId Loop ID to remove
     * @returns void
     */
    private clearGameLoop(loopId: number): void {
        Engine.instance._activeLoops.splice(Engine.instance._activeLoops.indexOf(loopId), 1);
    }
    private getLoopId(): number {
        return this._activeLoops.length;
    }
    private startGameLoop(update: (delta: number) => void): number {
        const tickLengthMilliseconds = 1000 / 30;
        const loopId = this.getLoopId();
        this._activeLoops.push(loopId);
        const tickLengthNano = tickLengthMilliseconds * Engine._milisecondToNano;
        const longWaitMilliseconds = Math.floor(tickLengthMilliseconds - 1);
        const longWaitNano = longWaitMilliseconds * Engine._milisecondToNano;
        let previous = this.getNanoSecond();
        let target = this.getNanoSecond();
        log(LogLevel.debug, "Before the inner loop");
        const loop = () => {
            if (Engine.instance.running) {
                Engine.instance._frame++;
                const now: number = this.getNanoSecond();
                if (now >= target) {
                    this._delta = now - previous;
                    previous = now;
                    target = now + tickLengthNano;
                    update(this._delta * Engine._nanoToSecond);
                }
                if (this._activeLoops.indexOf(loopId) === -1) {
                    return;
                }
                const remaningInTick = target - this.getNanoSecond();
                if (remaningInTick > longWaitNano) {
                    log(LogLevel.debug, `Set timeout ${Math.max(longWaitMilliseconds, 16)}`);
                    setTimeout(loop, Math.max(longWaitMilliseconds, 16));
                } else {
                    log(LogLevel.debug, "Set immediate");
                    setImmediate(loop);
                }
            } else {
                if (!Engine.instance.started) {
                    log(LogLevel.debug, "Engine not running or started");
                    return;
                }
                log(LogLevel.debug, "Engine not running");
                setTimeout(loop, Math.max(longWaitMilliseconds, 16));
            }
        };
        loop();
        return loopId;
    }
    
    private getNanoSecond(): number {
        let hourTime: [number, number] = process.hrtime();
        return (+hourTime[0]) * Engine._secondToNano + (+hourTime[1]);
    }
    private shutdown(): void {
        Engine.instance.cleanup();
        Engine._instance = undefined; // Last line of this function.
    }
    private update(delta: number): void {
        log(LogLevel.debug, `Delta is: ${Engine.instance.delta}`);
    }
}