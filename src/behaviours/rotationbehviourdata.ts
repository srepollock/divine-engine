import { Vector3 } from "../math/vector3";
import { IBehaviourData } from "./ibehaviourdata";

export class RotationBehaviourData implements IBehaviourData {
    public name!: string;
    public rotation: Vector3 = new Vector3();
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            throw new Error(`Name must be defined in behaviour data.`);
        }
        this.name = String(json.name);
        if (json.rotation !== undefined) {
            this.rotation.setFromJson(json.rotation);
        }
    }
}