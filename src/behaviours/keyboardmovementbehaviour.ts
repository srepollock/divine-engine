import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { InputManager } from "../inputsystem/inputmanager";
import { Keys } from "../inputsystem/keys";
import { Behaviour } from "./behaviour";
import { IBehaviourData } from "./ibehaviourdata";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class KeyboardMovementBehaviour extends Behaviour {
    // TODO: This should be a behaviour added to the player game object. Developer defined buttons and controls.
    public speed: number = 1;
    /**
     * Class constructor
     * @param  {KeyboardMovementBehaviourData} data
     */
    constructor(data: KeyboardMovementBehaviourData) {
        super(data);
        this.speed = data.speed;
    }
    /**
     * Updates the behaviour
     * @param  {number} delta
     * @returns void
     */
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

export class KeyboardMovementBehaviourData implements IBehaviourData {
    public name!: string;
    public speed: number = 1;
    /**
     * Sets this classes data from a JSON object.
     * @param  {any} json
     * @returns void
     */
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        if (json.speed !== undefined) {
            this.speed = Number(json.speed);
        }
        this.name = String(json.name);
    }
}

export class KeyboardMovementBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "keyboardmovement";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new KeyboardMovementBehaviourData();
        data.setFromJson(json);
        return new KeyboardMovementBehaviour(data);
    }
}