import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { OpeningGUIBehaviour } from "./openingguibehaviour";
import { OpeningGUIBehaviourData } from "./openingguibehaviourdata";

export class OpeningGUIBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "openingguibehaviour";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new OpeningGUIBehaviourData();
        data.setFromJson(json);
        return new OpeningGUIBehaviour(data);
    }
}