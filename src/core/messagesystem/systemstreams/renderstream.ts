import { SystemStream } from "../isystemstream";
import { MessageType } from "../messagetype";

/**
 * Render stream class to handle render messages.
 */
export class RenderStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Render;
}