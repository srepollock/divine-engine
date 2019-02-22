import { SystemStream } from "../isystemstream";
import { MessageType } from "../messagetype";

/**
 * Physics stream class to handle physic messages.
 */
export class PhysicsStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Physics;
}