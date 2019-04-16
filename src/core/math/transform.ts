/**
 * The entity objects position.
 */
export class Transform {
    /**
     * Transform constructor
     * @param x x world position
     * @param y y world positon
     */
    constructor(public x: number = 0, public y: number = 0) {
        this.x = x;
        this.y = y;
    }
}