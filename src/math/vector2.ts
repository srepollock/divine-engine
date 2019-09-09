export class Vector2 {
    /**
     * Vector2 constructor
     * @param  {number} publicx
     * @param  {number} publicy
     */
    constructor(public x: number = 0, public y: number = 0) {}
    /**
     * Gets the distance between two vector2s 
     * @param  {Vector2} a
     * @param  {Vector2} b
     * @returns number
     */
    public static distance(a: Vector2, b: Vector2): number {
        let diff = a.clone().subtract(b);
        return Math.sqrt((diff.x * diff.x) + (diff.y * diff.y));
    }
    /**
     * Add vector v to this vector.
     * @param  {Vector2} v
     * @returns Vector2
     */
    public add(v: Vector2): Vector2 {
        this.x = v.x + this.x;
        this.y = v.y + this.y;
        return this;
    }
    /**
     * Returns a clone of the vector3 it's called on.
     * @returns Vector2
     */
    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }
    /**
     * Copies the values from v into this Vector2, and returns this vector2
     * @param  {Vector2} v
     * @returns Vector2
     */
    public copy(v: Vector2): Vector2 {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    /**
     * Subtract vector v from this vector.
     * @param  {Vector2} v
     * @returns Vector2
     */
    public subtract(v: Vector2): Vector2 {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
        return this;
    }
    /**
     * Multiplies this vector by the vector passed
     * @param  {Vector2} v
     * @returns Vector2
     */
    public multiply(v: Vector2): Vector2 {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    /**
     * Divides this vector by the vector passed
     * @param  {Vector2} v
     * @returns Vector2
     */
    public divine(v: Vector2): Vector2 {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    /**
     * Returns the dot product (scale) of the vector dot another vector.
     * @param  {Vector2} v
     * @returns number
     */
    public dot(v: Vector2): number {
        return (this.x * v.x) + (this.y * v.y);
    }
    /**
     * Checks if the vector is equal to the one passed in.
     * @param  {Vector2} v
     * @returns boolean
     */
    public equals(v: Vector2): boolean {
        return v.x === this.x && v.y === this.y;
    }
    /**
     * Scales the vector by the given value.
     * @param  {number} value
     * @returns Vector2
     */
    public scale(value: number): Vector2 {
        return this.multiply(new Vector2(value, value));
    }
    /**
     * Sets the values of x,y
     * @param  {number} x
     * @param  {number} y
     * @returns void
     */
    public set({x, y}: {x?: number, y?: number} = {}): void {
        this.x = (x) ? x : this.x;
        this.y = (y) ? y : this.y;
    }
    /**
     * Returns the magnitude (length) of the vector.
     * @returns number
     */
    public magnitude(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
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
    }
    public toArray(): Array<number> {
        return [this.x, this.y];
    }
    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}