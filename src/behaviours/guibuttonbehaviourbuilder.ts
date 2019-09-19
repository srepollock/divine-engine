import { GUIButtonBehaviour } from "./guibuttonbehaviour";
import { GUIButtonBehaviourData } from "./guibuttonbehaviourdata";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

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