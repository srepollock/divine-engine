import { SystemStream } from "../messagesystem/src//isystemstream";
import { MessageType } from "../messagesystem/src//messagetype";

/**
 * IO stream class to handle io messages.
 * 
 * Would like to put this here: https://stackoverflow.com/questions/40306837/electron-processing-input
 */
export class IOStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.IO;
}