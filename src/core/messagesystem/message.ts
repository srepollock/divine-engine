import { IMessageHandler } from "./imessagehandler";
import { MessageBus } from "./messagebus";
import { MessagePriority } from "./messagepriority";

export class Message {
    public code: string;
    public context: any;
    public sender: any;
    public priority: MessagePriority;
    /**
     * Class constructor.
     * @param  {string} code
     * @param  {any} sender
     * @param  {any} context?
     * @param  {MessagePriority=MessagePriority.NORMAL} priority
     */
    constructor(code: string, sender: any, context?: any, priority: MessagePriority = MessagePriority.NORMAL) {
        this.code = code;
        this.sender = sender;
        this.context = context;
        this.priority = priority;
    }
    /**
     * Sends a message to the message bus.
     * @param  {string} code
     * @param  {any} sender
     * @param  {any} context?
     * @returns void
     */
    public static send(code: string, sender: any, context?: any): void {
        MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL));
    }
    /**
     * Sends a priority message to the message bus to be handled immediately.
     * @param  {string} code
     * @param  {any} sender
     * @param  {any} context?
     * @returns void
     */
    public static sendPriority(code: string, sender: any, context?: any): void {
        MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH));
    }
    /**
     * Subscribes a message handler to all message codes sent.
     * @param  {string} code
     * @param  {IMessageHandler} handler
     * @returns void
     */
    public static subscribe(code: string, handler: IMessageHandler): void {
        MessageBus.addSubscription(code, handler);
    }
    /**
     * Unsubscribes the handler from the message codes.
     * @param  {string} code
     * @param  {IMessageHandler} handler
     * @returns void
     */
    public static unsubscribe(code: string, handler: IMessageHandler): void {
        MessageBus.removeSubscription(code, handler);
    }
    /**
     * Unsubscribes the handler from all messages.
     * @param  {IMessageHandler} handler
     * @returns void
     */
    public static unsubscribeHandlerFromAll(handler: IMessageHandler): void {
        MessageBus.removeHandlerFromAll(handler);
    }
}