import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Vector3 } from "../math/vector3";
import { Behaviour } from "./behaviour";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourData } from "./ibehaviourdata";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class RotationBehaviour extends Behaviour {
    private _rotation: Vector3;
    /**
     * Class constructor.
     * @param  {RotationBehaviourData} data
     */
    constructor(data: RotationBehaviourData) {
        super(data);
        this._rotation = data.rotation;
    }
    /**
     * Updates the owner's z axis by the rotation.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        this._owner!.transform.rotation.add(this._rotation); 
        super.update(delta);
    }
}

export class RotationBehaviourData implements IBehaviourData {
    public name!: string;
    public rotation: Vector3 = new Vector3();
    /**
     * Sets this classes data from a JSON object.
     * @param  {any} json
     * @returns void
     */
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
        if (json.rotation !== undefined) {
            this.rotation.setFromJson(json.rotation);
        }
    }
}

export class RotationBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "rotation";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new RotationBehaviourData();
        data.setFromJson(json);
        return new RotationBehaviour(data);
    }
}