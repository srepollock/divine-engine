import { Message } from "./messages/message";

export interface IMessageHandler {
    id: string;
    onMessage(message: Message): void;
}