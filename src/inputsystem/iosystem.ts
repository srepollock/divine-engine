import { Engine, GameWindow } from "../core";
import { log, LogLevel } from "../core/loggingsystem";
import { Message, MessageType } from "../core/messagesystem";
import { System } from "../core/system";
import { MouseStream } from "../core/systemstreams/mousestream";
import { Vector2 } from "../math";

export class IOSystem extends System {
    private static _mouseAbsolute: Vector2;
    private static _left: boolean;
    private static _mousePosition: Vector2;
    private static _pressedMap: Map<string, boolean>;
    private static _right: boolean;
    private mouseStream: MouseStream;
    /**
     * Gets the absolute position of the mouse on the client screen.
     * @returns Vector2
     */
    public static get absolute(): Vector2 {
        return IOSystem._mouseAbsolute;
    }
    /**
     * Position relative to the game window.
     * @returns Vector2
     */
    public static get position(): Vector2 {
        return IOSystem._mousePosition;
    }
    /**
     * Constructor for the IOSystem
     */
    constructor() {
        super("iosystem");
        // Keyboard Setup
        Engine.instance!.container!.addEventListener("keydown", (e) => {
            IOSystem._pressedMap.set(e.key, true);
            this.sendMessage(JSON.stringify(IOSystem._pressedMap.get(e.key)), MessageType.IO);
        });
        Engine.instance!.container!.addEventListener("keyup", (e) => {
            IOSystem._pressedMap.set(e.key, false);
            this.sendMessage(JSON.stringify(IOSystem._pressedMap.get(e.key)), MessageType.IO);
        });
        // Mouse setup
        this.mouseStream = new MouseStream();
        IOSystem._mouseAbsolute = new Vector2();
        IOSystem._mousePosition = new Vector2();
        Engine.instance!.container!.addEventListener("mousemove", (e: any) => {
            IOSystem._mouseAbsolute = new Vector2(e.pageX, e.pageY);
            IOSystem.moveGameMouse(IOSystem._mouseAbsolute);
        });
        Engine.instance!.container!.addEventListener("mousedown", (e: any) => {
            if (e.button === 0) {
                IOSystem._left = true;
            } else {
                IOSystem._right = true;
            }
        });
        Engine.instance!.container!.addEventListener("mouseup", (e: any) => {
            if (e.button === 0) {
                IOSystem._left = false;
            } else {
                IOSystem._right = false;
            }
        });
    }
    /**
     * Moves the mouse and sets relative status to the Engine's GameWindow.
     * @param  {Vector2} vec
     * @returns void
     */
    public static moveGameMouse(vec: Vector2): void {
        let screen = Engine.instance!.container!.getBoundingClientRect();
        let screenScale = {width: Engine.instance!.renderSystem.width, height: Engine.instance!.renderSystem.height};
        let scaled = new Vector2(screenScale.width / GameWindow.width, screenScale.height / GameWindow.height);
        // tslint:disable-next-line: max-line-length
        IOSystem._mousePosition = new Vector2((vec.x - screen.left - screenScale.height) / scaled.x, (vec.y - screen.top - screenScale.width) / scaled.y);
    }
    public cleanup(): void {

    }
    public start(): void {

    }
    public stop(): void {

    }
    public update(delta: number): void {
        
    }
    public onMessge(message: Message): void {
        log(LogLevel.debug, message.toString());
    }
    public parseMessage(message: Message): void {
        
    }
}