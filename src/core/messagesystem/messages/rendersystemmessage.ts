import { Priority } from "../messagesystem";
import { Message } from "./message";

/**
 * Render system message  interface. 
 * All render messages must extend this interface.
 */
export class RenderSystemMessage extends Message {
    constructor(data?: string) {
        super("RenderSystemMessage", Priority.Urgent, data);
    }
}