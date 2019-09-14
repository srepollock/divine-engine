import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { SequenceBehaviour } from "./sequencebehaviour";
import { SequenceBehaviourData } from "./sequencebehaviourdata";

export class SequenceBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "sequence";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new SequenceBehaviourData();
        data.setFromJson(json);
        return new SequenceBehaviour(data);
    }
}