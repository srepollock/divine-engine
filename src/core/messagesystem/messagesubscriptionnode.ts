import { IMessageHandler } from "./imessagehandler";
import { Message } from "./message";

export class MessageSubscriptionMode {
    public message: Message;
    public handler: IMessageHandler;
    constructor(message: Message, handler: IMessageHandler) {
        this.message = message;
        this.handler = handler;
    }
}