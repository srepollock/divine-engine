import { BrowserWindow, Screen } from "electron";
import { Client } from "../helper";
import { Mouse } from "../inputsystem";
import { Vector2 } from "../math";
import { DObject } from "./dobject";
import { ErrorCode, log, LogLevel } from "./loggingsystem/src";
export class GameWindow extends DObject {
    /**
     * Gets if the window is fullscreen or not. Can only be fullscreen in Electron.
     * @returns boolean
     */
    public static get fullscreen(): boolean {
        if (GameWindow.client === Client.Electron) {
            return GameWindow.browserWindow!.isFullScreen();
        } else {
            log(LogLevel.error, 
                `The window can only be fullscreened in desktop mode. This will return true in the meantime.`, 
                ErrorCode.NotElectronWindow);
            return true;
        }
    }
    public static set fullscreen(b: boolean) {
        if (GameWindow.client === Client.Electron) {
            GameWindow.browserWindow!.setFullScreen(b);
        }
    }
    /**
     * Get's the height of the window
     * @returns number
     */
    public static get height(): number {
        if (GameWindow.client === Client.Electron) {
            return this.browserWindow!.getContentSize()[1];
        } else if ( GameWindow.client === Client.Browser) {
            return GameWindow.container!.getBoundingClientRect().height;
        } else {
            log(LogLevel.warning, `Engine was started in console and does not have a window to display to.`);
            return -1;
        }
    }
    /**
     * Get's the width of the window.
     * @returns number
     */
    public static get width(): number {
        if (GameWindow.client === Client.Electron) {
            return this.browserWindow!.getContentSize()[0];
        } else if (GameWindow.client === Client.Browser) {
            return GameWindow.container!.getBoundingClientRect().width;
        } else {
            log(LogLevel.warning, `Engine was started in console and does not have a window to display to.`);
            return -1;
        }
    }
    /**
     * Set's the game window's title
     * @param  {string} title
     */
    public static set title(title: string) {
        GameWindow.titleName = title;
        if (GameWindow.client === Client.Electron) {
            GameWindow.browserWindow!.setTitle(GameWindow.titleName);
        } else if (GameWindow.client === Client.Browser && typeof(document) !== "undefined") {
            document.title = GameWindow.titleName;
        } else {
            process.title = GameWindow.titleName;
        }
    }
    /**
     * Gets the title of the GameWindow.
     * @returns string
     */
    public static get title(): string {
        return GameWindow.titleName;
    }
    public static browserWindow: BrowserWindow | undefined = undefined;
    public static client: Client;
    public static container: HTMLElement | undefined;
    public static screen: Screen | undefined;
    private static titleName: string;
    constructor(title: string, client: Client, container?: HTMLElement) {
        super("GameWindow");
        GameWindow.titleName = title;
        GameWindow.client = client;
        if (GameWindow.client === Client.Electron) {
            var remote = require("electron").remote;
            GameWindow.browserWindow = remote.getCurrentWindow();
            GameWindow.screen = remote.screen;
        } else if (GameWindow.client === Client.Browser) {
            if (container !== undefined) {
                GameWindow.container = container;
            } else {
                GameWindow.container = undefined;
                log(LogLevel.warning, "Container undefined in GameWindow", ErrorCode.BrowserWindowUndefined);
            }
        }
    }
    public static mousePosition(): Vector2 {
        if (GameWindow.client === Client.Electron) {
            let pos = GameWindow.screen!.getCursorScreenPoint();
            return new Vector2(pos.x, pos.y);
        }
        return Mouse.absolute;
    }
    /**
     * Refresh the screen.
     * @returns void
     */
    public static refresh(): void {
        if (GameWindow.client === Client.Electron) {
            GameWindow.browserWindow!.reload();
        }
    }
    /**
     * Resize's the window.
     * @param  {number} height
     * @param  {number} width
     * @returns void
     */
    public static resize(height: number, width: number): void {
        if (GameWindow.client === Client.Electron) {
            GameWindow.browserWindow!.setSize(width, height);
        }
    }
    /**
     * Cleansup all the memory and tearsdown the GameWindow object.
     * @returns void
     */
    public static shutdown(): void {
        GameWindow.cleanup();
    }
    /**
     * Turns on Electron's Dev tools for the window.
     * @returns void
     */
    public static toggleDevTools(): void {
        if (GameWindow.client === Client.Electron) {
            (GameWindow.browserWindow as any).toggleDevTools();
        }
    }
    /**
     * Retunrs the GameWindows.titleName as a stringd.
     * @returns string
     */
    public static toString(): string {
        return GameWindow.titleName;
    }
    /**
     * Closes the window
     * @returns void
     */
    public static close(): void {
        GameWindow.cleanup();
        if (GameWindow.client === Client.Electron) {
            GameWindow.browserWindow!.close();
        }
    }
    /**
     * Extra cleanup steps should be taken here.
     * @returns void
     */
    private static cleanup(): void {
        
    }
}