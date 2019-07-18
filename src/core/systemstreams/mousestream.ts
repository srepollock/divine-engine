import { MessageType, SystemStream } from "../messagesystem/src";

export class MouseStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.IO;
}