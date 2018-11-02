import { Priority } from "../messagesystem";
import { Message } from "./message";

/**
 * Sound system message interface. 
 * All sound messages must extend this interface.
 */
export class SoundSystemMessage extends Message {
    constructor(data?: string) {
        super("SoundSystemMessage", Priority.Normal, data);
    }
}