import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { RotationBehaviour } from "./rotationbehaviour";
import { RotationBehaviourData } from "./rotationbehviourdata";

export class RotationBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    public get type(): string {
        return "rotation";
    }
    public buildFromJson(json: any): IBehaviour {
        let data = new RotationBehaviourData();
        data.setFromJson(json);
        return new RotationBehaviour(data);
    }
}