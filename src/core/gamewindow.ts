import { Client } from "./helperfunctions";
import { ErrorCode, Log, LogError } from "./logging";
import { Window } from "./window";

export class GameWindow implements Window { 
    private static _started: boolean = true;
    public container: HTMLElement | undefined;
    public browserWindow: Electron.BrowserWindow | undefined = undefined;
    public screen: Electron.Screen | undefined;
    public client: Client;
    private _title: string = "";
    constructor(client: Client, container?: HTMLElement) {
        if (!GameWindow._started) GameWindow._started = true;
        // else {
        //     LogError(ErrorCode.GameWindowUndefined, "Game window already started");
        //     throw ErrorCode.GameWindowUndefined;
        // }
        this.client = client;
        if (this.client === Client.Electron) {
            var remote = require("electron").remote;
            this.browserWindow = remote.getCurrentWindow();
            this.screen = remote.screen;
        } else if (this.client === Client.Browser) {
            if (container !== undefined) {
                this.container = container;
            } else {
                this.container = undefined;
                LogError(ErrorCode.BrowserWindowUndefined, "Container undefiend in GameWindow");
                throw ErrorCode.BrowserWindowUndefined;
            }
        }
    }
    /**
     * Get's the height of the window
     * @returns number
     */
    public get height(): number {
        return this.browserWindow!.getContentSize()[1];
    }
    /**
     * Get's the width of the window.
     * @returns number
     */
    public get width(): number {
        return this.browserWindow!.getContentSize()[0];
    }
    /**
     * Get if the window started or not.
     * @returns boolean
     */
    public static get started(): boolean {
        return GameWindow._started;
    }
    /**
     * Set's the game window's title
     * @param  {string} title
     */
    public set title(title: string) {
        this._title = title;
        if (this.client === Client.Electron) {
            this.browserWindow!.setTitle(this._title);
        } else if (this.client === Client.Browser && typeof(document) !== "undefined") {
            document.title = this._title;
        } else {
            process.title = this._title;
        }
    }
    /**
     * Window instance's start method.
     * @param  {HTMLElement} container
     * @returns void
     */
    public start(container: HTMLElement): void {
        this.container = container;
    }
    /**
     * Window instance's update method.
     * @returns void
     */
    public update(): void {
        // Calls update to the screen
        Log("GameWindow update");
    }
    /**
     * Refresh the screen.
     * @returns void
     */
    public refresh(): void {
        
    }
    /**
     * Resize's the window.
     * @param  {number} height
     * @param  {number} width
     * @returns void
     */
    public resize(height: number, width: number): void {
        this.browserWindow!.setSize(width, height);
    }
    /**
     * Closes the window
     * @returns void
     */
    public close(): void {
        this.browserWindow!.close();
    }
    /**
     * Cleansup all the memory and tearsdown the GameWindow object.
     * @returns void
     */
    public shutdown(): void {

    }
    /**
     * Window as a string
     * TODO: Put this in JSON format
     * @returns string
     */
    public toString(): string {
        return this.title;
    }
}

export { GameWindow as default };

