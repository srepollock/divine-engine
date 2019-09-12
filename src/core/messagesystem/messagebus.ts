import { log, LogLevel } from "de-loggingsystem";
import { IMessageHandler } from "./imessagehandler";
import { Message } from "./message";
import { MessagePriority } from "./messagepriority";
import { MessageSubscriptionMode } from "./messagesubscriptionnode";

export class MessageBus {
    private static _subscriptions: Map<string, Array<IMessageHandler>> = new Map();
    private static _normalMessagePerUpdate: number = 10;
    private static _normalMessageQueue: Array<MessageSubscriptionMode> = new Array();
    private static _priorityQueueMessagePerUpdate: number = 10;
    /**
     * Class constructor.
     */
    private constructor() {
        
    }
    /**
     * Adds a subscription to the message bus's subscriptions.
     * @param  {string} code
     * @param  {IMessageHandler} handler
     * @returns void
     */
    public static addSubscription(code: string, handler: IMessageHandler): void {
        if (MessageBus._subscriptions.get(code) === undefined) {
            MessageBus._subscriptions.set(code, new Array());
        }
        if (MessageBus._subscriptions.get(code)!.includes(handler)) {
            log(LogLevel.warning, `Attempting to add a duplicate of code: ${code}. Subscription not added.`);
        } else {
            MessageBus._subscriptions.get(code)!.push(handler);
        }
    }
    /**
     * Removes a subscription from the message bus subscriptions with a matching code and handler.
     * @param  {string} code
     * @param  {IMessageHandler} handler
     * @returns void
     */
    public static removeSubscription(code: string, handler: IMessageHandler): void {
        if (MessageBus._subscriptions.get(code) === undefined) {
            log(LogLevel.warning, `Cannot unsubscribe from code: ${code} because the code is not subscribed to.`);
            return;
        }
        let nodeIndex = MessageBus._subscriptions.get(code)!.indexOf(handler);
        if (nodeIndex !== -1) {
            MessageBus._subscriptions.get(code)!.splice(nodeIndex, 1);
        }
    }
    /**
     * Removes a handler from all subscribed codes.
     * @param  {IMessageHandler} handler
     * @returns void
     */
    public static removeHandlerFromAll(handler: IMessageHandler): void {
        MessageBus._subscriptions.forEach((key) => {
            let nodeIndex = key.indexOf(handler);
            if (nodeIndex !== -1) {
                key.splice(nodeIndex, 1);
            }
        });
    }
    /**
     * Posts the message to the message bus.
     * @param  {Message} message
     * @returns void
     */
    public static post(message: Message): void {
        log(LogLevel.debug, `Message posted: code ${message.code} context ${message.context}`);
        let handlers = MessageBus._subscriptions.get(message.code);
        if (handlers === undefined) {
            return;
        }
        handlers.forEach((handler) => {
            if (message.priority === MessagePriority.HIGH) {
                handler.onMessage(message);
            } else {
                MessageBus._normalMessageQueue.push(new MessageSubscriptionMode(message, handler));
            }
        });
    }
    /**
     * Updates the message bus to handle messages.
     * @param  {number} delta
     * @returns void
     */
    public static update(delta: number): void {
        if (MessageBus._normalMessageQueue.length === 0) {
            return;
        }
        let messageLimit = Math.min(MessageBus._priorityQueueMessagePerUpdate, MessageBus._normalMessageQueue.length);
        for (let i = 0; i < messageLimit; i++) {
            let node = MessageBus._normalMessageQueue.pop()!;
            node.handler.onMessage(node.message);
        }
    }
}