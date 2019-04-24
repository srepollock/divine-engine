import { log, LogLevel } from "../loggingsystem/src";
import { Message } from "../messagesystem";
import { System } from "../system";
import { SoundStream } from "../systemstreams";

/**
 * Sound System for the Divine Engine.
 * This engine uses HowlerJS for it's sound
 */
export class SoundSystem extends System {
    // public normalMessageQueue: Array<SoundSystemMessage> = new Array();
    public soundStream: SoundStream = new SoundStream();
    constructor() {
        super("soundsystem");
    }
    public update(delta: number): void {

    }
    public onMessage(message: Message): void {
        log(LogLevel.debug, message.toString());
        this.normalMessageQueue.push(message);
    }
}