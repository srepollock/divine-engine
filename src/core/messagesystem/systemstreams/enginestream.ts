import { SystemStream } from "../isystemstream";
import { MessageType } from "../messagetype";

/**
 * Engine stream class to handle engine messages.
 */
export class EngineStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Engine;
}