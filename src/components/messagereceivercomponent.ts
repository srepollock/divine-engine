import { Component, EventType, Message, MessageSystem } from "../core";

export class MessageReceiverComponent extends Component {
    constructor(tag: string, private messageSystem: MessageSystem) {
        super(tag);
        this.messageSystem = messageSystem;
    }
    public sendMessage(type: EventType | string, message: Message) {
        this.messageSystem.sendMessage(type, message);
    }
}