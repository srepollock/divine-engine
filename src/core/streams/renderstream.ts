import { Message, MessageType, SystemStream } from "../messagesystem/src";

export class RenderStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Render;
    constructor({messageQueueReference}: {messageQueueReference: Array<Message>}) {
        super({messageQueueReference});
    }
}