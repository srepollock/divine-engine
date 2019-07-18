export class Vector2 {
    /**
     * Vector2 constructor
     * @param  {number} publicx
     * @param  {number} publicy
     */
    constructor(public x: number = 0, public y: number = 0) {}
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
     * Returns the dot product (scale) of the vector dot another vector.
     * @param  {Vector2} v
     * @returns number
     */
    public dot(v: Vector2): number {
        return (this.x * v.x) + (this.y * v.y);
    }
    /**
     * Returns the magnitude (length) of the vector.
     * @returns number
     */
    public magnitude(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
}