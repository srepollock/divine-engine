import { MessageType, SystemStream } from "../messagesystem/src";

export class PhysicsStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Physics;
}