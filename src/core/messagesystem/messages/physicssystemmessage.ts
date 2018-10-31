import { Priority } from "../messagesystem";
import { Message } from "./message";

/**
 * Physics system message interface. 
 * All physics messages must extend this interface.
 */
export class PhysicsSystemMessage extends Message {
    constructor(data?: string) {
        super("PhysicsSystemMessage", Priority.Urgent, data);
    }
}