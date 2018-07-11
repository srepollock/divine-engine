import { Client, Engine } from "./engine";

export class GameWindow {
    private static _browserWindow: Electron.BrowserWindow;
    private static _title: string;
    constructor() {
        if (Engine.instance!.client === Client.Electron) {
            let remote = require("electron").remote;
            GameWindow._browserWindow = remote.getCurrentWindow();
        }
    }
    public get height(): number {
        return GameWindow._browserWindow.getContentSize()[1];
    }
    public static get title(): string {
        return GameWindow._title;
    }
    public static set title(title: string) {
        GameWindow._title = title;
    }
    public get width(): number {
        return GameWindow._browserWindow.getContentSize()[0];
    }
    public resize(height: number, width: number): void {
        GameWindow._browserWindow.setSize(width, height);
    }
    public close(): void {
        GameWindow._browserWindow.close();
    }
}