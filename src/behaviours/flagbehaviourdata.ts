import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Vector2 } from "../math/vector2";
import { IBehaviourData } from "./ibehaviourdata";

export class FlagBehaviourData implements IBehaviourData {
    public name!: string;
    public zoneName!: string;
    public flagCollisionComponent!: string;
    public playerCollisionComponent!: string;
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
        if (json.zoneName === undefined) {
            log(LogLevel.error, `zoneName must be defined in behaviour data.`, ErrorCode.NoName);
        } else {
            this.zoneName = String(json.zoneName);
        }
        if (json.flagCollisionComponent === undefined) {
            log(LogLevel.error, `flagCollisionComponent must be defined in behaviour data.`, ErrorCode.NoName);
        } else {
            this.flagCollisionComponent = String(json.flagCollisionComponent);
        }
        if (json.playerCollisionComponent === undefined) {
            log(LogLevel.error, `playerCollisionComponent must be defined in behaviour data.`, ErrorCode.NoName);
        } else {
            this.playerCollisionComponent = String(json.playerCollisionComponent);
        }
    }
}