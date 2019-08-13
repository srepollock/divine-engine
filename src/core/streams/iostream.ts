import { MessageType, SystemStream } from "../messagesystem/src";

export class IOStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.IO;
    constructor() {
        super();
    }
}