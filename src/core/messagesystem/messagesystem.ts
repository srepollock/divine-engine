import { guid, Point } from "../helper";
import { System } from "../isystem";
import { ErrorCode, Log, LogCritical, LogDebug, LogWarning } from "../logging";
import { IMessageHandler } from "./imessagehandler";
import { MessageReceiver } from "./messagereceiver";


/**
 * Message system
 * TODO: Should there be a que for the engine? [10/22] YES
 * TODO: [10/22] reworking things...
 */
export class MessageSystem implements System {
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
    private static _normalMessageQueue: MessageReceiver[] = [];
    /**
     * Message system constructor.
     */
    private constructor() {

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
     * @param  {EventType} et
     * @param  {IMessageHandler} handler
     * @returns void
     */
    public static addListener(type: EventType | string, handler: IMessageHandler): void {
        if (MessageSystem._listeners[type] === undefined ) {
            MessageSystem._listeners[type] = new Array<IMessageHandler>(); // REVIEW: What is this doing?
        } else {
            LogWarning(ErrorCode.FailedAddingListener, 
                `Event ${type} is already being handled, not creating new index.`);
        }
        if ( MessageSystem._listeners[type] !== undefined 
            && MessageSystem._listeners[type].indexOf(handler) !== -1 ) {
            LogWarning(ErrorCode.DuplicateListener, 
                `Attempting to add a duplicate handler to code:${type}. Listener not added.`);
        } else if (MessageSystem._listeners[type] !== undefined) {
            LogDebug(`Added ${type} and handler: ${JSON.stringify(handler)}`);
            MessageSystem._listeners[type].push( handler );
        } else {
            LogCritical(ErrorCode.ListenerUndefined, "");
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
            if (i !== undefined && i === type) { // DEBUG: i should be the EventType
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
                LogWarning(ErrorCode.MessageRecieverNotFound, `A node was never round.`);
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

/**
 *              ------------
 *              CORE CLASSES
 *              ------------
 *  Notes:
 *  ------
 *  
 *  These are all the core Messages that the system will handle. The 
 *  messages here correspond with the enumerator class `EventType` defined in 
 *  `messagesystem.ts`. For your own messages and message types, please save an
 *  enumerated list in your own message types file and extend these classes 
 *  there as well. 
 *  
 *  Instructions:
 *  -------------
 *  All messages must implement thier own constructor or else they will not 
 *  parse correctly.
 */
/**
 * Message object.
 * The data is saved as a JSON object in string format. It will be parsed based
 * on it's message type. Listeners have a specific format based on interface.
 */
export class Message {    
    // Unique message ID. Parse the current time to a hash.
    private _id: string;
    private _sender: any;
    private _priority: Priority;
    private _data: string;
    constructor(sender: any, priority: Priority, data: string = "") {
        this._id = guid();
        this._sender = sender;
        this._priority = priority;
        this._data = data;
    }
    public get id(): string {
        return this._id;
    }
    public get sender(): any {
        return this._sender;
    }
    public get priority(): Priority {
        return this._priority;
    }
    public get data(): string {
        return this._data;
    }
    /**
     * Returns the data as a JSON string object.
     * @returns string
     */
    public get JSONString(): string {
        return JSON.stringify(this);
    }
    /**
     * Returns the JSON object.
     * @returns JSON
     */
    public get JSON(): JSON {
        return JSON.parse(JSON.stringify(this));
    }
}

/** 
 * Testing message for empty messages.
 */
export class TestMessage extends Message {
    constructor(data?: string) {
        super("TestMessage", Priority.Low, data);
    }
}

/**
 * Base message data interface(class).
 * All messages must extend from this class.
 *  
 *  data: is a JSON string object.
 */

/**
 * EntityMessages interface. 
 * All entity messages must extend this interface.
 */
export class EntityMessage extends Message {
    constructor(data?: string) {
        super("EntityMessage", Priority.Normal, data);
    }
}

/**
 * IO system message interface. 
 * All io messages must extend this class.
 */
export class IOSystemMessage extends Message {
    constructor(data?: string) {
        super("IOSystemMessage", Priority.Normal, data);
    }
}

/**
 * Physics system message interface. 
 * All physics messages must extend this interface.
 */
export class PhysicsSystemMessage extends Message {
    constructor(data?: string) {
        super("PhysicsSystemMessage", Priority.Urgent, data);
    }
}

/**
 * Render system message  interface. 
 * All render messages must extend this interface.
 */
export class RenderSystemMessage extends Message {
    constructor(data?: string) {
        super("RenderSystemMessage", Priority.Urgent, data);
    }
}

/**
 * Sound system message interface. 
 * All sound messages must extend this interface.
 */
export class SoundSystemMessage extends Message {
    constructor(data?: string) {
        super("SoundSystemMessage", Priority.Normal, data);
    }
}
/**             ----------------
 *              END CORE CLASSES
 *              ----------------
 */
/**
 * Key input message interface.
 * For listeners, use 'keydown', 'keypress', 'keyup' events, just like standard
 * Javascript
 */
export class KeyInputMessage extends IOSystemMessage {
    constructor( public code: string) {
        super();
        this.code = code;
    }
}
/**
 * Mouse input message interface.
 */
export class MouseInputMessage extends IOSystemMessage {
    constructor(x: number, y: number) {
        super(JSON.stringify(new Point(x, y)));
    }
}
/**
 * Touch input message interface.
 */
export class TouchInputMessage extends IOSystemMessage {
    constructor( public x: number, 
        public y: number) {
        super();
        this.x = x;
        this. y = y;
    }
}
