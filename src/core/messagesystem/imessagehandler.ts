import { Message } from "./messagesystem";

export interface IMessageHandler {
    onMessage(message: Message): void;
}