import { Message } from "./messagesystem";

export interface IMessageHandler {
    guid: string;
    onMessage(message: Message): void;
}