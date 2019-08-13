import { Message, MessageType, SystemStream } from "../messagesystem/src";

export class SceneManagerStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Asset;
    constructor({messageQueueReference}: {messageQueueReference: Array<Message>}) {
        super({messageQueueReference});
    }
}