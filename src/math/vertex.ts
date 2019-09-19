import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";

export class Vertex {
    public position: Vector3;
    public texCoords: Vector2;
    /**
     * A vertex for WebGL containing the position (x,y,z) and texture coordinates (u,v).
     * @param  {number=0} x
     * @param  {number=0} y
     * @param  {number=0} z
     * @param  {number=0} u
     * @param  {number=0} v
     */
    constructor(x: number = 0, y: number = 0, z: number = 0, u: number = 0, v: number = 0) {
        this.position = new Vector3(x, y, z);
        this.texCoords = new Vector2(u, v);
    }
    /**
     * Gets the class as an array of number values.
     * @returns Array
     */
    public toArray(): Array<number> {
        return new Array().concat(this.position.toArray(), this.texCoords.toArray());
    }
    /**
     * Gets the class as a float32 array.
     * @returns Float32Array
     */
    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}