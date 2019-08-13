import { MessageType } from "src/core";
import { SystemStream } from "../messagesystem/src";

export class SceneManagerStream extends SystemStream {
    /**
     * Default message type for the stream.
     */
    public type: MessageType = MessageType.Asset;
    constructor() {
        super();
    }
}