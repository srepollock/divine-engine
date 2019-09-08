import { Vector2 } from "../math/vector2";

export class MouseContext {
    public leftDown: boolean;
    public rightDown: boolean;
    public position: Vector2;
    constructor(position: Vector2, leftDown: boolean = false, rightDown: boolean = false) {
        this.position = position;
        this.leftDown = (leftDown) ? leftDown : false;
        this.rightDown = (rightDown) ? rightDown : false;
    }
}