
import { Client, Engine } from "./engine";
import { Log } from "./logging";

export class GameWindow {
    private static _instance: GameWindow | undefined;
    private static _container: HTMLElement | null;
    private static _browserWindow: Electron.BrowserWindow | undefined = undefined;
    private static _screen: Electron.Screen;
    private static _title: string = "";
    private constructor(engine: Engine) {
        if (Engine.instance!.client === Client.Electron) {
            var remote = require("electron").remote;
            GameWindow._browserWindow = remote.getCurrentWindow();
            GameWindow._screen = remote.screen;
        }
        GameWindow._instance = this;
    }
    /**
     * Refresh the screen.
     * @returns void
     */
    public static refresh(): void {
        
    }
    public static start(engine: Engine): void {
        new GameWindow(engine);
        this._container = Engine.instance!.container;
    }
    /**
     * Cleansup all the memory and tearsdown the GameWindow object.
     * @returns void
     */
    public static shutdown(): void {
        this._instance = undefined;
    }
    public update(): void {
        // Calls update to the screen
        Log("GameWindow update");
    }
    public toString(): string | undefined {
        return GameWindow._title;
    }
    // DEBUG: Write tests for these functions next
    public get height(): number {
        return GameWindow._browserWindow!.getContentSize()[1];
    }
    public static get instance(): GameWindow | undefined {
        return GameWindow._instance;
    }
    public static get title(): string {
        return GameWindow._title;
    }
    public static set title(title: string) {
        GameWindow._title = title;
        if (Engine.instance!.client === Client.Electron) {
            GameWindow._browserWindow!.setTitle(GameWindow._title);
        } else if (Engine.instance!.client === Client.Browser) {
            document.title = GameWindow._title;
        } else { 
            process.title = GameWindow._title;
        }
    }
    public get width(): number {
        return GameWindow._browserWindow!.getContentSize()[0];
    }
    public get webWorker(): Worker | undefined {
        return GameWindow._instance!.webWorker!;
    }
    public resize(height: number, width: number): void {
        GameWindow._browserWindow!.setSize(width, height);
    }
    public close(): void {
        GameWindow._browserWindow!.close();
    }
}