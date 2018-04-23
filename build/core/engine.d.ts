import { GameWindow } from "./gamewindow";
export declare class EngineArguments {
    height: number;
    width: number;
    constructor(height?: number, width?: number);
}
export declare class Engine {
    private _started;
    private _running;
    private _exit;
    private _height;
    private _width;
    private _window;
    readonly started: boolean;
    readonly running: boolean;
    readonly exit: boolean;
    readonly height: number;
    readonly width: number;
    readonly window: GameWindow | undefined;
    constructor(args: EngineArguments);
    start(): void;
    update(): void;
    stop(): void;
    resize(height: number, width: number): void;
}
export default Engine;
