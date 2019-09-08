import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { GUIButtonBehaviourData } from "./guibuttonbehaviour";
import { GUIButtonBehaviour } from "./guibuttonbehaviourdata";

export class GUIButtonBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "guibutton";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new GUIButtonBehaviourData();
        data.setFromJson(json);
        return new GUIButtonBehaviour(data);
    }
}