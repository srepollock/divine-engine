import { MessageType, SystemStream } from "../messagesystem/src";

export class EngineStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Engine;
    constructor() {
        super();
    }
}