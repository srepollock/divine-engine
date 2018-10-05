import { Message } from "..";

export interface MessageReceiver {
    subscriptions: Array<string>;
    currentMesage: Message;
    sendMessage(): void;
    pollMessage(): Message;
    addSubscription(): void;
    removeSubscription(): void;
    basicMessageHandler(): void;
}