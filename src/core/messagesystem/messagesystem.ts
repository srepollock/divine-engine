import { ErrorCode, Log, LogCritical, LogDebug, LogError, LogWarning } from "../logging";
import { System } from "../system";
import { IMessageHandler } from "./imessagehandler";
import { MessageReceiver } from "./messagereceiver";
import { Message } from "./messages/message";


/**
 * Message system
 * TODO: Should there be a que for the engine? [10/22] YES
 * TODO: [10/22] reworking things...
 */
export class MessageSystem extends System {
    public static set listeners(Listeners: {[type: string]: IMessageHandler[]}) {
        MessageSystem._listeners = Listeners;
    }
    public static get listeners(): {[type: string]: IMessageHandler[]} {
        return MessageSystem._listeners;
    }
    /**
     * Returns the MessageSystem's instance.
     * Throw's critical message if undefined.
     * @returns MessageSystem
     */
    public static get instance() {
        if (MessageSystem._instance !== undefined) return MessageSystem._instance;
        else {
            LogCritical(ErrorCode.MessageSystemUndefined, "MessageSystem undefined");
        }
    }
    private static _instance: MessageSystem | undefined;
    private static _listeners: {[type: string]: Array<IMessageHandler>} = {};
    private static _normalQueueMessagePerUpdate: number = 10;
    private static _normalMessageQueue: Array<MessageReceiver> = Array();
    /**
     * Message system constructor.
     */
    private constructor() {
        super("messagesystem");
    }
    /**
     * Initializes the message system.
     * @returns void
     */
    public static initialize(): void {
        MessageSystem._instance = new MessageSystem();
        this.removeAllListeners();
    }
    /**
     * Adds a listener of the type to the system with the IMessageHandler to handle the message. The handler should 
     * be able to handle the message type or else there will be undefined errors in the system.
     * @param  {EventType} et
     * @param  {IMessageHandler} handler
     * @returns void
     */
    public static addListener(type: EventType | string, handler: IMessageHandler): void {
        if (MessageSystem._listeners[type] === undefined ) {
            MessageSystem._listeners[type] = new Array<IMessageHandler>(); // REVIEW: What is this doing?
        } else {
            // tslint:disable-next-line:max-line-length
            LogWarning(ErrorCode.FailedAddingListener, `Event ${type} is already being handled, not creating new index.`);
        }
        if ( MessageSystem._listeners[type] !== undefined 
            && MessageSystem._listeners[type].indexOf(handler) !== -1 ) {
            // tslint:disable-next-line:max-line-length
            LogWarning(ErrorCode.DuplicateListener, `Attempting to add a duplicate handler to code:${type}. Listener not added.`);
        } else if (MessageSystem._listeners[type] !== undefined) {
            LogDebug(`Added ${type} and handler: ${JSON.stringify(handler)}`);
            MessageSystem._listeners[type].push( handler );
        } else {
            // tslint:disable-next-line:max-line-length
            LogError(ErrorCode.ListenerUndefined, `Listener ${handler.id} could not be assigned to handle the event of type: ${type}`);
        }
    }
    /**
     * Total number of Listeners on the engine.
     * @returns number
     */
    public static allListenerCount(): number {
        var count: number = 0;
        for (let i in MessageSystem.listeners) {
            if (i !== undefined) {
                for (let k in MessageSystem.listeners[i]) {
                    if (MessageSystem.listeners[i][k] !== undefined) {
                        Log(`${JSON.stringify(MessageSystem.listeners[i][k])} is defined`);
                        count++;
                    }
                }
            }
        }
        return count;
    }
    /**
     * Number of listeners on the the engine listening to the type of event specified.
     * @param  {EventType} type
     * @returns number
     */
    public static listenerCount(type: EventType | string): number {
        var count: number = 0;
        for (let i in MessageSystem.listeners) {
            if (i !== undefined && i === type) {
                for (let k of MessageSystem.listeners[i]) {
                    count++;
                }
            }
        }
        return count;
    }
    /**
     * Remove the Listener of type with the handler, based on GUID.
     * If you think you may want to remove the listener, please hold onto the handler.
     * @param  {EventType} type
     * @param  {IMessageHandler} handler
     * @returns void
     */
    public static removeListener(type: EventType | string, handler: IMessageHandler): void {
        if ( MessageSystem._listeners[type] === undefined ) {
            LogWarning(ErrorCode.UnsubscribeFailed, 
                `Cannot unsubscribe handler from code: ${type} Because that code is not subscribed to`);
            return;
        }
        let nodeIndex = MessageSystem._listeners[type].indexOf( handler );
        if ( nodeIndex !== -1 ) {
            MessageSystem._listeners[type].splice( nodeIndex, 1 ); // REVIEW: This doesn't work
        }
    }
    /**
     * Send a new message to the system. There needs to be either an EventType 
     * or a string. Recommended to make an enumerator list to define your
     * own classes. The message needs to extends from the base Message class.
     * @param type 
     * @param message 
     */
    public static sendMessage(type: EventType | string, message: Message): void {
        Log(`Message posted: ${message}`);
        let handlers = MessageSystem._listeners[type];
        if ( handlers === undefined ) {
            return;
        }
            for ( let h of handlers ) {
            if ( message.priority === Priority.Hgih ) {
                h.onMessage( message );
            } else {
                MessageSystem._normalMessageQueue.push( new MessageReceiver( message, h ) );
            }
        }
    }
    /**
     * Removes all Listeners from the list.
     * @returns void
     */
    public static removeAllListeners(type?: EventType | string): void {
        if (type !== undefined) {
            for (let i in MessageSystem.listeners) {
                if (i !== undefined && i === type) {
                    MessageSystem.listeners[i] = [];
                }
            }
        } else {
            MessageSystem.listeners = {};
        }
    }
    /** 
     * Static call to the instances start function.
     * @returns void
     */
    public static start(): void {
        MessageSystem.instance!.start();
    }
    /**
     * Static call to the instances stop function.
     * @returns void
     */
    public static stop(): void {
        MessageSystem.instance!.stop();
    }
    /**
     * Static call to the instances shutdown function.
     * @returns void
     */
    public static shutdown(): void {
        MessageSystem.instance!.shutdown();
    }
    /**
     * Begins the message system. REVIEW: is this needed?
     * @returns void
     */
    public start(): void {
        
    }
    /**
     * Stops the message system. REVIEW: is this needed?
     * @returns void
     */
    public stop(): void {

    }
    /**
     * Shutsdown the message system.
     * @returns void
     */
    public shutdown(): void {
        MessageSystem.instance!.cleanup();
    }
    /**
     * Message system's update function. This is called first during the main engine's update to begin sorting messages.
     * @param  {number} delta current delta time to use for calculations.
     * @returns void
     */
    public update(delta: number): void {
        if ( MessageSystem._normalMessageQueue.length === 0 ) {
            return;
        }
        let messageLimit = Math.min( MessageSystem._normalQueueMessagePerUpdate, 
            MessageSystem._normalMessageQueue.length );
        for ( let i = 0; i < messageLimit; ++i ) {
            try {
                let node = MessageSystem._normalMessageQueue.pop();
                node!.handler.onMessage( node!.message );
            } catch (e) {
                LogWarning(ErrorCode.MessageRecieverNotFound, `A node was never found.`);
            }
        }
    }
    /**
     * Cleans up the Message system.
     * @returns void
     */
    public cleanup(): void {
        MessageSystem.removeAllListeners();
    }
}

/**
 * Base engine message types. These are all message types that are handled by 
 * the system natively.
 */
export enum EventType {
    Entity = "entity", 
    ErrorSystem = "errorsystem",
    IOSystem = "iosystem",
    PhysicsSystem = "physicssystem",
    RenderSystem = "rendersystem",
    SoundSystem = "soundsystem",
    KeyInput = "keyinput",
    MouseInput = "mouseinput",
    TouchInput = "touchinput"
}
/**
 * Message Priority. Constant.
 */
export enum Priority {
    Low,
    Normal,
    Hgih,
    Urgent
}
