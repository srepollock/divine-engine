import { SystemStream } from "../messagesystem/src//isystemstream";
import { MessageType } from "../messagesystem/src//messagetype";

/**
 * IO stream class to handle io messages.
 */
export class IOStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.IO;
}