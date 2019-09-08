import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { SoundBehaviour } from "./soundbehaviour";
import { SoundBehaviourData } from "./soundbehaviourdata";

export class SoundBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "sound";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new SoundBehaviourData();
        data.setFromJson(json);
        return new SoundBehaviour(data);
    }
}