import { FlagBehaviour } from "./flagbehaviour";
import { FlagBehaviourData } from "./flagbehaviourdata";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class FlagBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "flag";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new FlagBehaviourData();
        data.setFromJson(json);
        return new FlagBehaviour(data);
    }
}