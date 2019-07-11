import { log, LogLevel } from "../loggingsystem/src";
import { Message } from "../messagesystem/src";
import { System } from "../system";

export class IOSystem extends System {
    constructor() {
        super("iosystem");
    }
    public cleanup(): void {

    }
    public start(): void {

    }
    public stop(): void {

    }
    public update(delta: number): void {

    }
    public onMessge(message: Message): void {
        log(LogLevel.debug, message.toString());
    }
    public parseMessage(message: Message): void {
        
    }
}