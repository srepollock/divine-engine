import { OpeningGUIBehaviour } from "./openingguibehaviour";
import { OpeningGUIBehaviourData } from "./openingguibehaviourdata";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

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