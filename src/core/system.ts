import { DObject } from "./dobject";
import { ErrorCode, LogWarning } from "./logging";
import { Message } from "./messagesystem";

/**
 * Abstract System class. This is the base class of all other Systems in the Engine.
 */
export abstract class System extends DObject {
    /**
     * Message queue for the system to handle messages on udpate.
     * NOTE: normalMessageQueue will need to be redefined for each system implementation as each system has it's own 
     * messages.
     */
    public normalMessageQueue: Array<Message> = new Array();
    /**
     * This is the runner boolean.
     */
    private _running: boolean = false;
    /**
     * Gets if the system is running or not.
     * @returns boolean
     */
    public get running(): boolean {
        return this._running;
    }
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
        this._running = true;
    }
    /**
     * Stops the system.
     * @returns void
     */
    public stop(): void {
        this._running = false;
    }
    /**
     * System update function called in the Engine's update function.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        if (this.normalMessageQueue.length !== 0) {
            this.normalMessageQueue.forEach((message) => {
                LogWarning(ErrorCode.OK, `Base System message handler called. Did you forget to override?
                Handling message: ${message!.JSONString}`);
            });
        }
    }
    /**
     * Default system message handler. 
     * **This *MUST* be overridden in each System for their message types.**
     * Defaults an OK warning message. REVIEW: Should this be different?
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        this.normalMessageQueue.push(message);
    }
}