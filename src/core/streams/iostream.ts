import { Message, MessageType, SystemStream } from "../messagesystem/src";

export class IOStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.IO;
    constructor({messageQueueReference}: {messageQueueReference: Array<Message>}) {
        super({messageQueueReference});
    }
}