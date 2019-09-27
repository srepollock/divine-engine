import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Behaviour } from "./behaviour";
import { IBehaviourData } from "./ibehaviourdata";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class GUIButtonBehaviour extends Behaviour {
    public zoneName: string;
    /**
     * Class constructor
     * @param  {GUIButtonBehaviourData} data
     */
    constructor(data: GUIButtonBehaviourData) {
        super(data);
        this.zoneName = data.zoneName;
    }
}

export class GUIButtonBehaviourData implements IBehaviourData {
    public name!: string;
    public zoneName!: string;
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
        if (json.zoneName === undefined) {
            log(LogLevel.error, `ZoneName must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.zoneName = String(json.zoneName);
    }
}

export class GUIButtonBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "guibutton";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new GUIButtonBehaviourData();
        data.setFromJson(json);
        return new GUIButtonBehaviour(data);
    }
}