import { DObject } from "./dobject";
import { Message, SystemStream } from "./messagesystem";

/**
 * Abstract System class. This is the base class of all other Systems in the Engine.
 */
export abstract class System extends DObject {
    public running: boolean = false;
    protected _messageQueue: Array<Message> = new Array<Message>();
    protected _systemStream: SystemStream = new SystemStream();
    /**
     * Constructor for the system class. Always call super and give the system name as the tag. There shall never be 
     * two of the same system currently loaded into the engine.
     * @param  {string} tag
     */
    constructor(tag: string) {
        super(tag);
    }
    /**
     * Cleans anything that is not automatically garbage collected. This will also remove all listeners from this 
     * system's _systemStream.
     * Called in shutdown.
     * @returns void
     */
    public abstract cleanup(): void;
    /**
     * Shutsdown the system. This should be called from the Engine class.
     * You shouldn't need to override this method, however if you do always call super if overriding this method. 
     * It ensures the cleanup is called.
     * @returns void
     */
    public shutdown(): void {
        this.cleanup();
    }
    /**
     * Starts the system. 
     * @returns void
     */
    public abstract start(): void;
    /**
     * Stops the system.
     * @returns void
     */
    public abstract stop(): void;
    /**
     * System update function called in the Engine's update function.
     * @param  {number} delta
     * @returns void
     */
    public abstract update(delta: number): void;
    
    /**
     * Default system message handler. 
     * **This *MUST* be overridden in each System for their message types.**
     * Defaults an OK warning message. REVIEW: Should this be different?
     * @param  {Message} message
     * @returns void
     */
    public abstract onMessage(message: Message): void;
}