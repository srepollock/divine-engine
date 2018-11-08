import { Message, SoundSystemMessage } from "../messagesystem";
import { System } from "../system";

/**
 * Sound System for the Divine Engine.
 * This engine uses HowlerJS for it's sound
 */
export class SoundSystem extends System {
    public normalMessageQueue: Array<SoundSystemMessage> = new Array();
    constructor() {
        super("soundsystem");
    }
    public update(delta: number): void {

    }
    public onMessage(message: Message): void {
        let m: SoundSystemMessage = message as SoundSystemMessage;
        this.normalMessageQueue.push(m);
    }
}