import { log, LogLevel } from "../loggingsystem/src";
import { Message } from "../messagesystem";
import { System } from "../system";
import { AssetStream } from "../systemstreams/assetstream";

/**
 * Sound System for the Divine Engine.
 * This engine uses HowlerJS for it's sound
 */
export class AssetSystem extends System {
    public assetStream: AssetStream = new AssetStream();
    protected messageQueue: Array<Message> = new Array<Message>();
    constructor() {
        super("soundsystem");
    }
    public start() {
        this.assetStream.on("data", (data) => {
            this.messageQueue.push(data as Message);
        });
    }
    public update(delta: number): void {
        this.messageQueue.forEach((element) => {
            this.parseMessage(element);
        });
        this.messageQueue = new Array<Message>();
    }
    public parseMessage(message: Message): void {
        log(LogLevel.debug, message.toString());
    }
}