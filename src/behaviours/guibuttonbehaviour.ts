import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { IBehaviourData } from "./ibehaviourdata";

export class GUIButtonBehaviourData implements IBehaviourData {
    public name!: string;
    public zoneName!: string;
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
        if (json.zoneName === undefined) {
            log(LogLevel.error, `ZoneName must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.zoneName = String(json.zoneName);
    }
}