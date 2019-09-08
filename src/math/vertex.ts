import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";

export class Vertex {
    public position: Vector3;
    public texCoords: Vector2;
    constructor(x: number = 0, y: number = 0, z: number = 0, u: number = 0, v: number = 0) {
        this.position = new Vector3(x, y, z);
        this.texCoords = new Vector2(u, v);
    }
    public toArray(): Array<number> {
        return new Array().concat(this.position.toArray(), this.texCoords.toArray());
    }
    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}