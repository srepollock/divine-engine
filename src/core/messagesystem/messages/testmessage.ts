import { Priority } from "../messagesystem";
import { Message } from "./message";
/** 
 * Testing message for empty messages.
 */
export class TestMessage extends Message {
    constructor(data?: string) {
        super("TestMessage", Priority.Low, data);
    }
}