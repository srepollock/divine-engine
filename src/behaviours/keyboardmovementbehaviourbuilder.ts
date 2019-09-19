import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { KeyboardMovementBehaviourData } from "./keyboardmovementbehaviourdata";
import { KeyboardMovementBehaviour } from "./keyboardmovementbehaviour";

export class KeyboardMovementBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "keyboardmovement";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new KeyboardMovementBehaviourData();
        data.setFromJson(json);
        return new KeyboardMovementBehaviour(data);
    }
}