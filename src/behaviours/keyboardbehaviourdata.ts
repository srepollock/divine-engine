import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
import { IBehaviourData } from "./ibehaviourdata";

export class KeyboardMovementBehaviourData implements IBehaviourData {
    public name!: string;
    public speed: number = 1;
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