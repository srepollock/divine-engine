import { SystemStream } from "../messagesystem/src//isystemstream";
import { MessageType } from "../messagesystem/src//messagetype";

/**
 * Render stream class to handle render messages.
 */
export class RenderStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Render;
}