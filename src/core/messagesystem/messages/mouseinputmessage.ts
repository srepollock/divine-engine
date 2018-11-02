import { Point } from "../../helper";
import { IOSystemMessage } from "./iosystemmessage";
/**
 * Mouse input message interface.
 */
export class MouseInputMessage extends IOSystemMessage {
    constructor(x: number, y: number) {
        super(JSON.stringify(new Point(x, y)));
    }
}