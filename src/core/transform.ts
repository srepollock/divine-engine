import { Matrix4 } from "../math/matrix4";
import { Vector3 } from "../math/vector3";

export class Transform {
    public position: Vector3 = Vector3.zero();
    public rotation: Vector3 = Vector3.zero();
    public scale: Vector3 = Vector3.one();
    constructor() {

    }
    public copy(t: Transform): void {
        this.position.copy(t.position);
        this.rotation.copy(t.rotation);
        this.scale.copy(t.scale);
    }
    public getTransformMatrix(): Matrix4 {
        let translation: Matrix4 = Matrix4.translate(new Matrix4(), this.position.x, this.position.y, this.position.z);
        let rotation: Matrix4 = Matrix4.rotateXYZ(new Matrix4(), this.rotation.x, this.rotation.y, this.rotation.z);
        let scale: Matrix4 = Matrix4.scale(new Matrix4(), this.scale.x, this.scale.y, this.scale.z);
        // Scale * Rotation * Translation
        return Matrix4.multiply(Matrix4.multiply(scale, rotation), translation);
    }
    public setFromJson(json: any): void {
        if (json.position !== undefined) {
            this.position.setFromJson(json.position);
        }
        if (json.rotation !== undefined) {
            this.rotation.setFromJson(json.rotation);
        }
        if (json.scale !== undefined) {
            this.scale.setFromJson(json.scale);
        }
    }
}