import { Vector2 } from "./vector2";

export class Vector3 extends Vector2 {
    constructor(x: number = 0, y: number = 0, public z: number = 0) {
        super(x, y);
    }
    /**
     * Add vector v to this vector.
     * @param  {Vector3} v
     * @returns Vector3
     */
    public add(v: Vector3): Vector3 {
        this.x = v.x + this.x;
        this.y = v.y + this.y;
        this.z = v.z + this.z;
        return this;
    }
    /**
     * Subtract vector v from this vector.
     * @param  {Vector3} v
     * @returns Vector3
     */
    public subtract(v: Vector3): Vector3 {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
        this.z = this.z - v.z;
        return this;
    }
    /**
     * Returns the dot product (scale) of the vector dot another vector.
     * @param  {Vector3} v
     * @returns number
     */
    public dot(v: Vector3): number {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
    }
    /**
     * Returns the magnitude (length) of the vector.
     * @returns number
     */
    public magnitude(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }
}