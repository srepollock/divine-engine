import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { IBehaviourData } from "./ibehaviourdata";

export class SoundBehaviourData implements IBehaviourData {
    public name!: string;
    public soundName!: string;
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
        if (json.soundName === undefined) {
            log(LogLevel.critical, `SoundName was not defined.`, ErrorCode.SoundName);
        } else {
            this.soundName = String(json.soundName);
        }
    }
}