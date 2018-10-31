import { IMessageHandler } from "./imessagehandler";
import { Message } from "./messages/message";

export class MessageReceiver {
    public message: Message;
    public handler: IMessageHandler;
    public constructor( message: Message, handler: IMessageHandler ) {
    this.message = message;
    this.handler = handler;
    }
}