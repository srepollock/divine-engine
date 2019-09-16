import { Vector2 } from "../math/vector2";

export class MouseContext {
    /**
     * Holds onto mouse information to pass around.
     * @param  {Vector2} position
     * @param  {boolean=false} leftDown
     * @param  {boolean=false} rightDown
     */
    constructor(public position: Vector2, 
        public leftDown: boolean = false, 
        public rightDown: boolean = false) {

    }
}