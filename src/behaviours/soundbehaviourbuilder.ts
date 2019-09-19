import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { SoundBehaviour } from "./soundbehaviour";
import { SoundBehaviourData } from "./soundbehaviourdata";

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