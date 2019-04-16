import { SystemStream } from "../messagesystem/src//isystemstream";
import { MessageType } from "../messagesystem/src//messagetype";

/**
 * Physics stream class to handle physic messages.
 */
export class PhysicsStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Physics;
}