import { log, LogLevel } from "../loggingsystem/src";
import { Message } from "../messagesystem";
import { System } from "../system";

export class PhysicsSystem extends System {
    /**
     * Physics system constructor.
     */
    constructor() {
        super("physicssystem");
    }
    public cleanup(): void {

    }
    public start(): void {

    }
    public stop(): void {

    }
    public update(delta: number): void {
        this.messageQueue.forEach((element) => {
            this.parseMessage(element);
        });
        this.messageQueue = new Array<Message>();
    }
    public onMessage(message: Message): void {
        log(LogLevel.debug, message.toString());
    }
    public parseMessage(message: Message): void {
        log(LogLevel.debug, message.toString());
    }
}