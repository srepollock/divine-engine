import { Message } from "./message";

/**
 * JSON Handler interface.
 */
export interface IJsonHandler {
    /**
     * Converts the message from JSON.
     * @param  {string} chunk String to change from a Message object.
     * @returns Message
     */
    fromJSON(chunk: string): Message;
    /**
     * Converts the message to JSON.
     * @param  {Message} chunk Message to change to a string
     * @returns string
     */
    toJSON(chunk: Message): string;
}