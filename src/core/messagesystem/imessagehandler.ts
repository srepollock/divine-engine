import { Message } from "./messagesystem";

export interface IMessageHandler {
    id: string;
    onMessage(message: Message): void;
}