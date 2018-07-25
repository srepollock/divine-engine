
import { Engine } from "./engine";
import { Log } from "./logging";

export class Window {
    private static _instance: Window | undefined;
    private static _container: HTMLElement | null;
    private _webWorker: Worker | undefined;
    private _browserWindow: Electron.BrowserWindow | undefined = undefined;
    private _title: string = "";
    private constructor(engine: Engine) {
        this._webWorker = undefined;
        // this._webWorker = spawn();
        Window._instance = this;
    }
    /**
     * Refresh the screen.
     * @returns void
     */
    public static refresh(): void {
        
    }
    public static start(engine: Engine): void {
        new Window(engine);
        this._container = Engine.instance!.container;
    }
    /**
     * Cleansup all the memory and tearsdown the Window object.
     * @returns void
     */
    public static shutdown(): void {
        this._instance!._webWorker = undefined;
        this._instance = undefined;
    }
    public update(): void {
        // Calls update to the screen
        Log("Window update");
    }
    public toString(): string | undefined {
        return this._title + this._webWorker!.toString();
    }
    // DEBUG: Write tests for these functions next
    public get height(): number {
        return this._browserWindow!.getContentSize()[1];
    }
    public static get instance(): Window | undefined {
        return Window._instance;
    }
    public static get title(): string {
        return Window._instance!._title;
    }
    public static set title(title: string) {
        Window._instance!._title = title;
    }
    public get width(): number {
        return this._browserWindow!.getContentSize()[0];
    }
    public get webWorker(): Worker | undefined {
        return Window._instance!.webWorker!;
    }
    public resize(height: number, width: number): void {
        this._browserWindow!.setSize(width, height);
    }
    public close(): void {
        this._browserWindow!.close();
    }
}