import { Vector3 } from "../math/vector3";
import { Behaviour } from "./behaviour";
import { RotationBehaviourData } from "./rotationbehviourdata";

export class RotationBehaviour extends Behaviour {
    private _rotation: Vector3;
    constructor(data: RotationBehaviourData) {
        super(data);
        this._rotation = data.rotation;
    }
    public update(delta: number): void {
        this._owner.transform.rotation.add(this._rotation); 
        super.update(delta);
    }
}