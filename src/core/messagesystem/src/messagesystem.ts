import { Transform, TransformCallback } from "stream";
import { Message } from "./message";

export class MessageSystem extends Transform {
    constructor() {
        super({highWaterMark: 100, readableObjectMode: true, writableObjectMode: true});
    }
    public _transform(chunk: Message, encoding: string,
        callback: TransformCallback): void {
            try {
                let output: string = chunk.toString();
                callback(undefined, output);
            } catch (err) {
                callback(err);
            }
        }
}