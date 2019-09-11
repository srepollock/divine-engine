import { Vector3 } from "../math/vector3";
import { Behaviour } from "./behaviour";
import { RotationBehaviourData } from "./rotationbehviourdata";

export class RotationBehaviour extends Behaviour {
    private _rotation: Vector3;
    /**
     * Class constructor.
     * @param  {RotationBehaviourData} data
     */
    constructor(data: RotationBehaviourData) {
        super(data);
        this._rotation = data.rotation;
    }
    /**
     * Updates the owner's z axis by the rotation.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        this._owner!.transform.rotation.add(this._rotation); 
        super.update(delta);
    }
}