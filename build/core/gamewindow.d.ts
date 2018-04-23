export declare class GameWindow {
    private browserWindow;
    private _title;
    constructor(title: string);
    readonly height: number;
    readonly title: string;
    readonly width: number;
    resize(height: number, width: number): void;
    close(): void;
}
