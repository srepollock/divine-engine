import { DObject } from "./dobject";
import { ErrorCode, LogWarning } from "./logging";
import { Message } from "./messagesystem";

/**
 * Abstract System class. This is the base class of all other Systems in the Engine.
 */
export abstract class System extends DObject {
    public normalMessageQueue: Array<Message> = new Array(); // REVIEW: I don't need this do I?
    public priorityMessageQueue: Array<Message> = new Array();
    /**
     * Constructor for the system class. Always call super and give the system name as the tag. There shall never be 
     * two of the same system currently loaded into the engine.
     * @param  {string} tag
     */
    constructor(tag: string) {
        super(tag);
    }
    /**
     * Cleans anything that is not automatically garbage collected.
     * Called in shutdown.
     * @returns void
     */
    public cleanup(): void {

    }
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
    public start(): void {

    }
    /**
     * Stops the system.
     * @returns void
     */
    public stop(): void {
        
    }
    /**
     * System update function called in the Engine's update function.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        if (this.priorityMessageQueue.length === 0 
            && this.normalMessageQueue.length === 0) {
            return; // NOTE: Reutrn if nothing in the queue. This should never be the case.
        } else {
            // NOTE: Begin with the priority the normal
            this.priorityMessageQueue.forEach((message) => {
                
            });
        }
    }
    /**
     * Default system message handler. This should be overridden in each System for their message types.
     * Defaults an OK warning message. REVIEW: Should this be different?
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        LogWarning(ErrorCode.OK, "System message handler called. Did you forget to override?");
    }
}