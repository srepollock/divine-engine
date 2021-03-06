import { Message } from "../core/messagesystem/message";
import { MessageType } from "../core/messagesystem/messagetype";
import { Keys } from "../inputsystem/keys";
import { MouseContext } from "../inputsystem/mousecontext";
import { Vector2 } from "../math/vector2";

export class InputManager {
    private static _keys: Map<number, boolean> = new Map();
    private static _mouseX: number;
    private static _mouseY: number;
    private static _previousMouseX: number;
    private static _previousMouseY: number;
    private static _mouseLeft: boolean = false;
    private static _mouseRight: boolean = false;
    /**
     * Class constructor.
     */
    private constructor() {

    }
    /**
     * Initializes the list of keys to false and sets up the listeners for the engine.
     * @returns void
     */
    public static initialize(): void {
        for (let i = 0; i < 255; i++) {
            InputManager._keys.set(i, false);
        }
        window.addEventListener("keydown", InputManager.onKeyDown);
        window.addEventListener("keyup", InputManager.onKeyUp);
        window.addEventListener("mousemove", InputManager.onMouseMove);
        window.addEventListener("mousedown", InputManager.onMouseDown);
        window.addEventListener("mouseup", InputManager.onMouseUp);
    }
    /**
     * Get's if the key is down in the InputManager.
     * @param  {Keys} key
     * @returns boolean
     */
    public static isKeyDown(key: Keys): boolean {
        return InputManager._keys.get(key)!;
    }
    /**
     * Gets the current mouse position based on the last updates.
     * @returns Vector2
     */
    public static getMousePosition(): Vector2 {
        return new Vector2(InputManager._mouseX, InputManager._mouseY);
    }
    /**
     * Handler for key down messages from the window class.
     * @param  {KeyboardEvent} ev
     * @returns boolean
     */
    private static onKeyDown(ev: KeyboardEvent): boolean {
        InputManager._keys.set(ev.keyCode, true);
        Message.send(MessageType.KEY_DOWN, this, ev.keyCode);
        // ev.preventDefault();
        // ev.stopPropagation();
        return true;
    }
    /**
     * Handler for key up messages from the window class.
     * @param  {KeyboardEvent} ev
     * @returns boolean
     */
    private static onKeyUp(ev: KeyboardEvent): boolean {
        InputManager._keys.set(ev.keyCode, false);
        Message.send(MessageType.KEY_UP, this, ev.keyCode);
        // ev.preventDefault();
        // ev.stopPropagation();
        return true;
    }
    /**
     * Handler for mouse movement messages from the window class.
     * @param  {KeyboardEvent} ev
     * @returns boolean
     */
    private static onMouseMove(ev: MouseEvent): void {
        InputManager._previousMouseX = InputManager._mouseX;
        InputManager._previousMouseY = InputManager._mouseY;
        InputManager._mouseX = ev.clientX;
        InputManager._mouseY = ev.clientY;
    }
    /**
     * Handler for mouse button down messages from the window class.
     * @param  {KeyboardEvent} ev
     * @returns boolean
     */
    private static onMouseDown(ev: MouseEvent): void {
        if (ev.button === 0) {
            InputManager._mouseLeft = true;
        } else if (ev.button === 2) {
            InputManager._mouseRight = true;
        }
        Message.send("MOUSE_DOWN", this, new MouseContext(InputManager.getMousePosition(), InputManager._mouseLeft, 
            InputManager._mouseRight));
    }
    /**
     * Handler for mouse button up messages from the window class.
     * @param  {KeyboardEvent} ev
     * @returns boolean
     */
    private static onMouseUp(ev: MouseEvent): void {
        if (ev.button === 0) {
            InputManager._mouseLeft = false;
        } else if (ev.button === 2) {
            InputManager._mouseRight = false;
        }
        Message.send("MOUSE_UP", this, new MouseContext(InputManager.getMousePosition(), InputManager._mouseLeft, 
            InputManager._mouseRight));
    }
}