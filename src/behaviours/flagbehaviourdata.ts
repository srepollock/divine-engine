import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
import { Vector2 } from "../math/vector2";
import { IBehaviourData } from "./ibehaviourdata";

export class FlagBehaviourData implements IBehaviourData {
    public name!: string;
    public position!: Vector2;
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
    }
}