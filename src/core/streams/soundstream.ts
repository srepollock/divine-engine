import { Message, MessageType, SystemStream } from "../messagesystem/src";

export class SoundStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Sound;
    constructor({messageQueueReference}: {messageQueueReference: Array<Message>}) {
        super({messageQueueReference});
    }
}