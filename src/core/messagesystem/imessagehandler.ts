import { Message } from "./message";

export interface IMessageHandler {
    /**
     * Function to handle all messages sent to the object implementing the interface.
     * @param  {Message} message
     * @returns void
     */
    onMessage(message: Message): void;
}