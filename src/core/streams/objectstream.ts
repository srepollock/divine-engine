import { Message, MessageType, SystemStream} from "../messagesystem/src";

export class ObjectStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Global;
    constructor({messageQueueReference}: {messageQueueReference: Array<Message>}) {
        super({messageQueueReference});
    }
}