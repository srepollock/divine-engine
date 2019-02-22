import { MessageType } from "./messagetype";

/**
 * Engine messages
 */
export class Message {
    /**
     * Unique ID for the message
     */
    private _uid: string = this.guid();
    /**
     * Message constructor
     * @param  {string=""} private_data Message data; default empty
     * @param  {MessageType=MessageType.Global} private_type Message Type; default global
     * @param  {boolean=false} private_single If the message should be handled once or not; default true
     */
    constructor(
        private _data: string = "",
        private _type: MessageType = MessageType.Global, 
        private _single: boolean = false) { }
    /**
     * Gets the message unique id.
     * @returns string Unique ID
     */
    public get uid(): string {
        return this._uid;
    }
    /**
     * Gets the message type.
     * @returns MessageType Type
     */
    public get type(): MessageType {
        return this._type;
    }
    /**
     * Gets if the message is single or not.
     * @returns boolean True or false
     */
    public get single(): boolean {
        return this._single;
    }
    /**
     * Gets the message's data
     * @returns string Data
     */
    public get data(): string {
        return this._data;
    }
    /**
     * Returns the message as a string.
     * @returns string
     */
    public toString(): string {
        return JSON.stringify(this);
    }
    /**
     * Creates the unique id for the message.
     * @returns string Unique ID
     */
    private guid(): string {
        return "" + Math.random().toString(36).substr(2, 9);
    }
}