import { SystemStream } from "../isystemstream";
import { MessageType } from "../messagetype";

/**
 * Sound stream class to handle sound messages.
 */
export class SoundStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Sound;
}