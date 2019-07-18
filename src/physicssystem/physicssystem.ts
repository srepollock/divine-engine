import { log, LogLevel } from "../core/loggingsystem";
import { Message } from "../core/messagesystem";
import { System } from "../core/system";

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