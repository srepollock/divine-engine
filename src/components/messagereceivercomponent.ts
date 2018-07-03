import { Component, EventType, Message, MessageSystem } from "../core";

export class MessageReceiverComponent implements Component {
    constructor(public id: string, private messageSystem: MessageSystem) {
        this.id = id;
        this.messageSystem = messageSystem;
    }
    public sendMessage(type: EventType | string, message: Message) {
        this.messageSystem.sendMessage(type, message);
    }
}