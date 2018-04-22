import { BrowserWindow } from "electron";
import { ErrorCode, LogError } from ".";
export class GameWindow {
    private browserWindow: Electron.BrowserWindow;
    private _title: string;
    constructor(title: string) {
        let remote = require("electron").remote;
        this._title = title;
        this.browserWindow = remote.getCurrentWindow();
    }
    public get height(): number {
        return this.browserWindow.getContentSize()[1];
    }
    public get title(): string {
        return this._title;
    }
    public get width(): number {
        return this.browserWindow.getContentSize()[0];
    }
    public resize(height: number, width: number): void {
        this.browserWindow.setSize(width, height);
    }
    public close(): void {
        this.browserWindow.close();
    }
}