import { Engine } from "./engine";
import { guid } from "./helperfunctions";
import { MessageReceiver } from "./messagereceiver";
import { EventType, Message, TestMessage } from "./messagesystem";

export interface DObject {

}

/**
 * All objects begin passed as messages in the message system extend this 
 * object. They are ID'd on their string. The engine creates unique ID's for
 * each object to verify them.
 */
export class DObject implements MessageReceiver {
    public tag: string;
    public _currentMessage: Message = new TestMessage("initialized"); // NOTE: This will get overwritten
    public _subscriptions: Array<string> = new Array<string>();
    private _guid: string;
    constructor(tag: string = "") {
        this._guid = guid();
        this.tag = tag;
    }
    public get guid(): string {
        return this._guid;
    }
    public get currentMesage(): Message {
        return this._currentMessage;
    }
    public sendMessage(event: string, data: string): void {
        // REVIEW: MessageSystem??
        Engine.instance.messageSystem.emit(event, data);
    }
    /**
     * Gets messages from the message system
     * // REVIEW: With a message queue manager is this needed?
     * @returns Message
     */
    public pollMessage(): Message {
        return this._currentMessage;
    }
    /**
     * Adds subscription to the list
     * @param  {string} event
     * @returns void
     */
    public addSubscription(event: string): void {
        this._subscriptions.push(event);
    }
    /**
     * Removes all subscriptions of type "event"
     * @param  {string} event
     * @returns void
     */
    public removeSubscription(event: string): void {
        var subSize: number =  this._subscriptions.length - 1;
        for (var i = 0; i < subSize; i++) {
            if (this._subscriptions[i] === event) {
                this._subscriptions.splice(i);
                subSize - 1; // reduce size
                i--; // reduce count, it moved back
            }
        }
    }
    /**
     * Basic message handler
     * @param  {Message} message
     * @returns void
     */
    public basicMessageHandler(message: Message): void {
        Engine.instance.messageSystem.emit(EventType.IOSystem, message);
    }
}

