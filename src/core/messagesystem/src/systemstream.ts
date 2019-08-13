import { Transform, TransformCallback } from "stream";
import { IJsonHandler } from "./ijsonhandler";
import { Message } from "./message";
import { MessageType } from "./messagetype";

/**
 * System stream parent class. All system streams extend from this object.
 */
export class SystemStream extends Transform implements IJsonHandler {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Global;
    /**
     * Reference to the Systems Message Queue for proper parsing and usage in the engine.
     */
    private _messageQueue: Array<Message>;
    /**
     * Constructor for the system stream.
     */
    constructor({messageQueueReference}: {messageQueueReference: Array<Message>}) {
        super({highWaterMark: 100, readableObjectMode: true, writableObjectMode: true});
        this._messageQueue = messageQueueReference;
    }
    /**
     * Converts the message from JSON.
     * @param  {string} chunk String to change from a Message object.
     * @returns Message
     */
    public fromJSON(chunk: string): Message {
        return Object.assign(new Message(), JSON.parse(chunk));
    }
    /**
     * Converts the message to JSON.
     * @param  {Message} chunk Message to change to a string
     * @returns string
     */
    public toJSON(chunk: Message): string {
        return JSON.stringify(chunk);
    }
    /**
     * Defined transform function that gets called by the inner Transform object function.
     * @param  {string} chunk Chunk or message to pass.
     * @param  {string} encoding Type of string
     * @param  {TransformCallback} callback 
     * @returns string
     */
    public _transform(chunk: string, encoding: string, callback: TransformCallback): void {
        let message: Message = this.fromJSON(chunk);
        if (message.type === this.type) {
            this.handleMessage(message);
            if (message.single) {
                message = new Message(message.data, MessageType.Removed, true);
            }
            callback(undefined, chunk);
        } else {
            callback(undefined, chunk);
        }
    }
    /**
     * Handles the message for the user.
     * @param  {Message} message
     * @returns void
     */
    private handleMessage(message: Message): void {
        this._messageQueue.push(message);
    }
}