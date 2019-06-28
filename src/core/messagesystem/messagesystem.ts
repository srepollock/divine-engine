import { Transform, TransformCallback } from "stream";
import { Message } from "./message";

/**
 * Message System for the engine, used as a stream.
 */
export class MessageSystem extends Transform {
    /**
     * Constructor for the stream, sets default stream size and turns on object mode.
     */
    constructor() {
        super({highWaterMark: 100, readableObjectMode: true, writableObjectMode: true});
    }
    /**
     * Defined transform function that gets called by the inner Transform object function.
     * @param  {Message} chunk Message to send
     * @param  {string} encoding Encoding type
     * @param  {TransformCallback} callback Transform callback
     * @returns void
     */
    public _transform(chunk: Message, encoding: string,
        callback: TransformCallback): void {
            let output: string = chunk.toString();
            callback(undefined, output);
        }
}