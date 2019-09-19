import { IMessageHandler } from "./imessagehandler";
import { Message } from "./message";

export class MessageSubscriptionMode {
    public message: Message;
    public handler: IMessageHandler;
    /**
     * Class Constructor.
     * @param  {Message} message
     * @param  {IMessageHandler} handler
     */
    constructor(message: Message, handler: IMessageHandler) {
        this.message = message;
        this.handler = handler;
    }
}