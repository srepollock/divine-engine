import { Vector2 } from "./vector2";

export class Vector3 extends Vector2 {
    constructor(x: number = 0, y: number = 0, public z: number = 0) {
        super(x, y);
    }
    /**
     * Gets the distance between two vector3s
     * @param  {Vector3} a
     * @param  {Vector3} b
     * @returns number
     */
    public static distance(a: Vector3, b: Vector3): number {
        let diff = a.subtract(b);
        return Math.sqrt((diff.x * diff.x) + (diff.y * diff.y) + (diff.z * diff.z));
    }
    /**
     * Creates a Vector3 of 0, 0, 0.
     * @returns Vector3
     */
    public static zero(): Vector3 {
        return new Vector3();
    }
    /**
     * Creates a Vector3 of 1, 1, 1
     * @returns Vector3
     */
    public static one(): Vector3 {
        return new Vector3(1, 1, 1);
    }
    /**
     * Add vector v to this vector.
     * @param  {Vector3} v
     * @returns Vector3
     */
    public add(v: Vector3): Vector3 {
        super.add(new Vector2(v.x, v.y));
        this.z = v.z + this.z;
        return this;
    }
    /**
     * Returns a clone of the vector3 it's called on.
     * @returns Vector3
     */
    public clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }
    /**
     * Copies the values from v into a new Vector3
     * @param  {Vector3} v
     */
    public copy(v: Vector3): Vector3 {
        super.copy(new Vector2(v.x, v.y));
        this.z = v.z;
        return this;
    }
    /**
     * Subtract vector v from this vector.
     * @param  {Vector3} v
     * @returns Vector3
     */
    public subtract(v: Vector3): Vector3 {
        super.subtract(new Vector2(v.x, v.y));
        this.z = this.z - v.z;
        return this;
    }
    /**
     * Multiplies this vector by the vector passed
     * @param  {Vector3} v
     * @returns Vector3
     */
    public multiply(v: Vector3): Vector3 {
        super.multiply(new Vector2(v.x, v.y));
        this.z *= v.z;
        return this;
    }
    /**
     * Divides this vector by the vector passed
     * @param  {Vector3} v
     * @returns Vector3
     */
    public divine(v: Vector3): Vector3 {
        super.divine(new Vector2(v.x, v.y));
        this.z /= v.z;
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
     * Checks if the vector is equal to the one passed in.
     * @param  {Vector3} v
     * @returns boolean
     */
    public equals(v: Vector3): boolean {
        return super.equals(new Vector2(v.x, v.y)) && v.z === this.z;
    }
    /**
     * Scales the vector3 by the given value.
     * @param  {number} value
     * @returns Vector3
     */
    public scale(value: number): Vector3 {
        return this.multiply(new Vector3(value, value, value)); // NOTE: LOOK AT ALL THAT VALUE!
    }
    /**
     * Sets the values of x,y,z
     * @param  {number} x
     * @param  {number} y
     * @param  {number} z
     * @returns void
     */
    public set({x, y, z}: {x?: number, y?: number, z?: number} = {}): void {
        super.set({x, y});
        this.z = (z) ? z : this.z;
    }
    /**
     * Returns the magnitude (length) of the vector.
     * @returns number
     */
    public magnitude(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }
    /**
     * Sets a Vector3 object with json data.
     * @param  {any} json
     * @returns void
     */
    public setFromJson(json: any): void {
        if (json.x !== undefined) {
            this.x = Number(json.x);
        } else {
            this.x = 0;
        }
        if (json.y !== undefined) {
            this.y = Number(json.y);
        } else {
            this.y = 0;
        }
        if (json.z !== undefined) {
            this.z = Number(json.z);
        } else {
            this.z = 0;
        }
    }
    /**
     * Gets the Vector3 object and returns it as a numbers array.
     * @returns Array
     */
    public toArray(): Array<number> {
        return [this.x, this.y, this.z];
    }
    /**
     * Gets the Vector3 object and returns it as a float32 array.
     * @returns Float32Array
     */
    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}