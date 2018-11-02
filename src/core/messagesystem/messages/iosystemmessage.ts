import { Priority } from "../messagesystem";
import { Message } from "./message";

/**
 * IO system message interface. 
 * All io messages must extend this class.
 */
export class IOSystemMessage extends Message {
    constructor(data?: string) {
        super("IOSystemMessage", Priority.Normal, data);
    }
}