import { SystemStream } from "../isystemstream";
import { MessageType } from "../messagetype";

/**
 * IO stream class to handle io messages.
 */
export class IOStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.IO;
}