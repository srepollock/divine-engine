import { Vector2 } from "src";

export class UVInfo {
    public min: Vector2;
    public max: Vector2;
    constructor(min: Vector2, max: Vector2) {
        this.min = min;
        this.max = max;
    }
}