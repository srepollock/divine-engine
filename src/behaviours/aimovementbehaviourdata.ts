import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
import { Vector2 } from "../math/vector2";
import { IBehaviourData } from "./ibehaviourdata";

export class AIMovementBehaviourData implements IBehaviourData {
    public name!: string;
    public start!: Vector2;
    public end!: Vector2;
    public direction!: Vector2;
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
        if (json.start !== undefined) {
            this.start.setFromJson(json.start);
        }
        if (json.end !== undefined) {
            this.end.setFromJson(json.end);
        }
        if (json.direction !== undefined) {
            this.direction.setFromJson(json.direction);
        }
    }
}