import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Vector2 } from "../math/vector2";
import { IShape2D } from "./ishape2d";
import { Rectangle2D } from "./rectangle2d";

export class Circle2D implements IShape2D {
    public position: Vector2 = new Vector2();
    public radius: number = 0;
    public origin: Vector2 = new Vector2(0.5, 0.5);
    /**
     * Gets the offset of the circle.
     * @returns Vector2
     */
    public get offset(): Vector2 {
        return new Vector2(this.radius + (this.radius * this.origin.x), this.radius + (this.radius * this.origin.y));
    }
    /**
     * Sets the circle object from JSON data.
     * @param  {any} json
     * @returns void
     */
    public setFromJson(json: any): void {
        if (json.position !== undefined) {
            this.position.setFromJson(json.position);
        }
        if (json.origin !== undefined) {
            this.origin.setFromJson(json.origin);
        }
        if (json.radius === undefined) {
            log(LogLevel.error, `Circle requires radius to be set.`, ErrorCode.NoRadius);
        } else {
            this.radius = json.radius;
        }
    }
    /**
     * Checks if the other shape intersects with the shape called on.
     * @param  {IShape2D} other
     * @returns boolean
     */
    public intersect(other: IShape2D): boolean {
        if (other instanceof Circle2D) {
            let distance: number = Math.abs(Vector2.distance(other.position, this.position));
            let radiusLength: number = this.radius + other.radius;
            if (distance <= radiusLength) {
                return true;
            }
        }
        if ( other instanceof Rectangle2D ) {
            let deltaX = this.position.x - Math.max(other.position.x, Math.min(this.position.x, other.position.x + 
                other.width));
            let deltaY = this.position.y - Math.max(other.position.y, Math.min(this.position.y, other.position.y + 
                other.height));
            let check = (deltaX * deltaX + deltaY * deltaY);
            let check2 = (this.radius * this.radius);
            if ( check < check2) {
                return true;
            }
        }
        return false;
    }
    /**
     * Checks if the point is in the shape called on.
     * @param  {Vector2} point
     * @returns boolean
     */
    public pointInShape(point: Vector2): boolean {
        let absoluteDistance: number = Math.abs(Vector2.distance(this.position, point));
        if (absoluteDistance <= this.radius) {
            return true;
        }
        return false;
    }
}