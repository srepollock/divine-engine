import { guid } from "../helper";
import { log, LogLevel } from "./loggingsystem/src";
import { Message, MessageType } from "./messagesystem";
import { ObjectStream } from "./streams";

export class DObject {
    /**
     * Gets the DObjects guid.
     * @returns string
     */
    public get id(): string {
        return this._id;
    }
    public tag: string;
    public messageQueue: Array<Message> = new Array<Message>();
    private _id: string;
    private _dobjectStream = new ObjectStream({messageQueueReference: this.messageQueue});
    /**
     * DObject Constructor.
     * Tag is an additional identifier for the DObject.
     * @param  {string=""} tag Tag for the object to be identified on.
     */
    constructor(tag: string = "") {
        this._id = guid();
        this.tag = tag;
    }
    /**
     * Returns a DObject from a string.
     * Help from : https://stackoverflow.com/a/10916838/5078905
     * @param  {string} message
     * @returns DObject
     */
    public static fromMessage(message: string): DObject {
        return Object.assign(Object.create(DObject), JSON.parse(message));
    }
    /**
     * Returns this object as a JSON string to send in messages.
     * @returns string
     */
    public asMessage(): string {
        let str = JSON.stringify(this);
        return str;
    }
    /**
     * DObjects base messasge handler receiving messages.
     * This can and most likely will be rewritten.
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        // public onMessage(type: MessageType, callback: () => {}): void {
        // REVIEW: Should this be called on update?
        log(LogLevel.debug, `${this.tag} receiving: ${message.toString()}`);
    }
    /**
     * Sends a message to the engine stream.
     * @param  {string} data
     * @param  {MessageType} type
     * @param  {boolean} single?
     * @returns void
     */
    public sendMessage(data: string, type: MessageType, single?: boolean): void {
        this._dobjectStream.write(new Message(data, type, single));
    }
}