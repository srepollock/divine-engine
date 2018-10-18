import { guid } from "./helperfunctions";
import { MessageReceiver } from "./messagereceiver";
import { Message, TestMessage } from "./messagesystem";

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
    /**
     * Adds a subscription type to the DObject to recieve messages from the Message System
     * REVIEW: This is defined as a prototype function in Engine.ts
     * @param  {string} event
     * @param {callback} handler A callback on how to handle the message
     * @returns void
     */
    public addSubscription(event: string, handler: () => {}): void {

    }
    /**
     * Sends a mesage to the MessageSystem.
     * REVIEW: This is defined as a prototype function in Engine.ts
     * @param  {string} event
     * @param  {Message} data
     * @returns void
     */
    public sendMessage(event: string, data: Message): void {
        
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
     * Basic message handler.
     * REVIEW: This is defined as a prototype function in Engine.ts
     * @param  {Message} message
     * @returns void
     */
    public basicMessageHandler(message: Message): void {
        
    }
}
