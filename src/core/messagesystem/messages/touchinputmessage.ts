import { IOSystemMessage } from "./iosystemmessage";
/**
 * Touch input message interface.
 * NOTE: Out of scope for v1.0.0 of this project.
 */
export class TouchInputMessage extends IOSystemMessage {
    constructor( public x: number, 
        public y: number) {
        super();
        this.x = x;
        this. y = y;
    }
}