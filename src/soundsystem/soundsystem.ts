import { log, LogLevel } from "../core/loggingsystem/src";
import { Message } from "../core/messagesystem/src";
import { SoundStream } from "../core/streams";
import { System } from "../core/system";
import { ISound } from "./isound";

/**
 * Sound System for the Divine Engine.
 * This engine uses HowlerJS for it's sound.
 * 
 * // TODO: SoundAction will have to be sorted out. This is how the engine will play sounds. Triggers and delays will 
 * require more information.
 */
export class SoundSystem extends System {
    private static _instance: SoundSystem;
    private _sounds: Map<string, ISound>;
    /**
     * Gets the sound system's instance.
     * @returns SoundSystem
     */
    public static get instance(): SoundSystem {
        return SoundSystem._instance;
    }
    /**
     * Returns all the sounds currently in the system.
     * @returns Map<string, ISound>
     */
    public get sounds(): Map<string, ISound> {
        return this._sounds;
    }
    private constructor() {
        super("soundsystem");
        this.systemStream = new SoundStream({messageQueueReference: this.messageQueue});
        this._sounds = new Map<string, ISound>();
        SoundSystem._instance = this;
    }
    /**
     * Initializes the system. This is how the Engine starts and gets a handle of the system.
     * @returns void
     */
    public static initialize(): SoundSystem {
        new SoundSystem();
        SoundSystem._instance.start();
        return SoundSystem._instance;
    }
    /**
     * Cleans up the SoundSystem on shutdown.
     * @returns void
     */
    public cleanup(): void {
        this._sounds = new Map<string, ISound>();
        this.systemStream.removeAllListeners();
    }
    /**
     * Starts the system. Sets all stream listeners in the meantime.
     * @returns void
     */
    public start(): void {
        this.systemStream.on("data", (data) => {
            this.messageQueue.push(Object.assign(new Message(), JSON.parse(data)));
        });
        log(LogLevel.debug, "Sound System started, all system listeners added");
        this.running = true;
    }
    /**
     * Stops the SoundSystem from playing.
     * @returns void
     */
    public stop(): void {
        this.running = false;
    }
    /**
     * The update function for the system.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        if (this.running) {
            this.messageQueue.forEach((element) => {
                this.onMessage(element);
            });
            this.messageQueue = new Array<Message>();
        }
    }
    public onMessage(message: Message): void {
        log(LogLevel.debug, message.toString());
    }
}