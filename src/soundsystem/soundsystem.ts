import { log, LogLevel } from "../core/loggingsystem/src";
import { Message } from "../core/messagesystem/src";
import { SoundStream } from "../core/streams";
import { System } from "../core/system";

/**
 * Sound System for the Divine Engine.
 * This engine uses HowlerJS for it's sound.
 * 
 * // TODO: SoundAction will have to be sorted out. This is how the engine will play sounds. Triggers and delays will 
 * require more information.
 */
export class SoundSystem extends System {
    public soundStream: SoundStream = new SoundStream();
    protected messageQueue: Array<Message> = new Array<Message>();
    constructor() {
        super("soundsystem");
        this._systemStream = new SoundStream();
    }
    public start(): void {
        this.soundStream.on("data", (data) => {
            this.messageQueue.push(data as Message);
        });
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