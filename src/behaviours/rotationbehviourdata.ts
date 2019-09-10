import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Vector3 } from "../math/vector3";
import { IBehaviourData } from "./ibehaviourdata";

export class RotationBehaviourData implements IBehaviourData {
    public name!: string;
    public rotation: Vector3 = new Vector3();
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