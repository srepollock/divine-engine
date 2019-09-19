import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { RotationBehaviour } from "./rotationbehaviour";
import { RotationBehaviourData } from "./rotationbehviourdata";

export class RotationBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "rotation";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new RotationBehaviourData();
        data.setFromJson(json);
        return new RotationBehaviour(data);
    }
}