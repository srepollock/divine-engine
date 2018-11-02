import { Priority } from "../messagesystem";
import { Message } from "./message";
/**
 * EntityMessages interface. 
 * All entity messages must extend this interface.
 */
export class EntityMessage extends Message {
    constructor(data?: string) {
        super("EntityMessage", Priority.Normal, data);
    }
}