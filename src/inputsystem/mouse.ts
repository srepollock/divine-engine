import { Engine, GameWindow } from "../core";
import { MouseStream } from "../core/systemstreams/mousestream";
import { Vector2 } from "../math";
// REVIEW: Should this be moved or encapsulated into the IOSystem instead of two separate classes?
export class Mouse {
    private static _absolute: Vector2;
    private static _position: Vector2;
    private static _left: boolean;
    private static _right: boolean;
    private mouseStream: MouseStream;
    /**
     * Gets the absolute position of the mouse on the client screen.
     * @returns Vector2
     */
    public static get absolute(): Vector2 {
        return Mouse._absolute;
    }
    /**
     * Position relative to the game window.
     * @returns Vector2
     */
    public static get position(): Vector2 {
        return Mouse._position;
    }
    constructor() {
        this.mouseStream = new MouseStream();
    }
    /**
     * Initializes the mouse for Engine usage.
     * @returns void
     */
    public static init(): void {
        // TODO: This cannot be tested in Jest; must use something else or user testing.
        Mouse._absolute = new Vector2();
        Mouse._position = new Vector2();
        Engine.instance!.container!.addEventListener("mousemove", (e: any) => {
            Mouse._absolute = new Vector2(e.pageX, e.pageY);
            Mouse.moveGameMouse(Mouse._absolute);
        });
        Engine.instance!.container!.addEventListener("mousedown", (e: any) => {
            if (e.button === 0) {
                Mouse._left = true;
            } else {
                Mouse._right = true;
            }
        });
        Engine.instance!.container!.addEventListener("mouseup", (e: any) => {
            if (e.button === 0) {
                Mouse._left = false;
            } else {
                Mouse._right = false;
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
        Mouse._position = new Vector2((vec.x - screen.left - screenScale.height) / scaled.x, (vec.y - screen.top - screenScale.width) / scaled.y);
    }
}