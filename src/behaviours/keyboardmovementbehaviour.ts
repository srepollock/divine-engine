import { InputManager } from "../inputsystem/inputmanager";
import { Keys } from "../inputsystem/keys";
import { Behaviour } from "./behaviour";
import { KeyboardMovementBehaviourData } from "./keyboardbehaviourdata";

export class KeyboardMovementBehaviour extends Behaviour {
    public speed: number = 1;
    constructor(data: KeyboardMovementBehaviourData) {
        super(data);
        this.speed = data.speed;
    }
    public update(delta: number): void {
        super.update(delta);
        if (InputManager.isKeyDown(Keys.DownArrow)) {
            this._owner!.transform.position.y += this.speed;
        }
        if (InputManager.isKeyDown(Keys.UpArrow)) {
            this._owner!.transform.position.y -= this.speed;
        }
        if (InputManager.isKeyDown(Keys.LeftArrow)) {
            this._owner!.transform.position.x -= this.speed;
        }
        if (InputManager.isKeyDown(Keys.RightArrow)) {
            this._owner!.transform.position.x += this.speed;
        }
    }
}