import { Message } from "./messagesystem";

export default interface MessageReceiver {
    _subscriptions: Array<string>;
    _currentMessage: Message;
    sendMessage(event: string, data: string): void;
    pollMessage(): Message;
    addSubscription(event: string): void;
    removeSubscription(event: string): void;
    basicMessageHandler(message: Message): void;
}