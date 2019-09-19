import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { OpeningGUIBehaviour } from "./openingguibehaviour";
import { OpeningGUIBehaviourData } from "./openingguibehaviourdata";

export class OpeningGUIBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "openingguibehaviour";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new OpeningGUIBehaviourData();
        data.setFromJson(json);
        return new OpeningGUIBehaviour(data);
    }
}