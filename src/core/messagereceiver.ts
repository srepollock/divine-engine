import { Message } from "./messagesystem";

export interface MessageReceiver {
    _subscriptions: Array<string>;
    _currentMessage: Message;
    sendMessage(event: string, data: Message): void;
    addSubscription(event: string, handler: () => {}): void;
    removeSubscription(event: string): void;
    basicMessageHandler(message: Message): void;
}