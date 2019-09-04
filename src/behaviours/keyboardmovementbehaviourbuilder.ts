import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { KeyboardMovementBehaviourData } from "./keyboardbehaviourdata";
import { KeyboardMovementBehaviour } from "./keyboardmovementbehaviour";

export class KeyboardMovementBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "keyboardmovement";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new KeyboardMovementBehaviourData();
        data.setFromJson(json);
        return new KeyboardMovementBehaviour(data);
    }
}