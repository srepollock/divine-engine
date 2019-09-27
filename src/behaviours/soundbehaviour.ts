import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { AudioManager } from "../soundsystem";
import { Behaviour } from "./behaviour";
import { IBehaviourData } from "./ibehaviourdata";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class SoundBehaviour extends Behaviour {
    private _soundName: string;
    /**
     * Class constructor.
     * @param  {SoundBehaviourData} data
     */
    constructor(data: SoundBehaviourData) {
        super(data);
        this._soundName = data.soundName;
        AudioManager.playSound(this._soundName);
    }
    /**
     * Updates the sound behaviour.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        super.update(delta);
    }
}

export class SoundBehaviourData implements IBehaviourData {
    public name!: string;
    public soundName!: string;
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
        if (json.soundName === undefined) {
            log(LogLevel.critical, `SoundName was not defined.`, ErrorCode.SoundName);
        } else {
            this.soundName = String(json.soundName);
        }
    }
}

export class SoundBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour.
     * @returns string
     */
    public get type(): string {
        return "sound";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new SoundBehaviourData();
        data.setFromJson(json);
        return new SoundBehaviour(data);
    }
}