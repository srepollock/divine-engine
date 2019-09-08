import { GUIBehaviour } from "./guibehaviour";
import { GUIBehaviourData } from "./guibehaviourdata";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class GUIBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "guibehaviour";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new GUIBehaviourData();
        data.setFromJson(json);
        return new GUIBehaviour(data);
    }
}