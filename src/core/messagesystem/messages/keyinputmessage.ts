import { KeyCode } from "../../helper";
import { IOSystemMessage } from "./iosystemmessage";
/**
 * Key input message interface.
 * For listeners, use 'keydown', 'keypress', 'keyup' events, just like standard
 * Javascript
 */
export class KeyInputMessage extends IOSystemMessage {
    constructor( public code: KeyCode) {
        super();
        this.code = code;
    }
}