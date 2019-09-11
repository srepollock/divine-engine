import { AIMovementBehaviour } from "./aimovementbehaviour";
import { AIMovementBehaviourData } from "./aimovementbehaviourdata";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class AIMovementBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "aimovement";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new AIMovementBehaviourData();
        data.setFromJson(json);
        return new AIMovementBehaviour(data);
    }
}