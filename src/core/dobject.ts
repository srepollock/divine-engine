import { guid } from "../helper";
import { log, LogLevel } from "./loggingsystem/src";
import { Message, MessageType, SystemStream } from "./messagesystem";

export class DObject {
    /**
     * Gets the DObjects guid.
     * @returns string
     */
    public get id(): string {
        return this._id;
    }
    private static ObjectStream = class extends SystemStream {
        /**
         * Default message type for the stream.
         */
        public type: MessageType = MessageType.Global;
        constructor({messageQueueReference}: {messageQueueReference: Array<Message>}) {
            super({messageQueueReference});
        }
    };
    public tag: string;
    public messageQueue: Array<Message> = new Array<Message>();
    private _id: string;
    private _dobjectStream = new DObject.ObjectStream({messageQueueReference: this.messageQueue});
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
     * Returns this object as a JSON string to send in messages.
     * @returns string
     */
    public asMessage(): string {
        return JSON.stringify(this);
    }
    /**
     * DObjects base messasge handler receiving messages.
     * This can and most likely will be rewritten.
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        // public onMessage(type: MessageType, callback: () => {}): void {
        // REVIEW:
        // Should this be called on update?
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