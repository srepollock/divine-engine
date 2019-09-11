import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Vector2 } from "../math/vector2";
import { IBehaviourData } from "./ibehaviourdata";

export class AIMovementBehaviourData implements IBehaviourData {
    public name!: string;
    public start: Vector2 = new Vector2();
    public end: Vector2 = new Vector2();
    public direction: Vector2 = new Vector2(1, 0);
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