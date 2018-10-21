import { RenderComponent } from "../../components/rendercomponent";
import { guid } from "../helperfunctions";
import { System } from "../isystem";
import { ErrorCode, Log, LogCritical, LogWarning } from "../logging";
import { IMessageHandler } from "./imessagehandler";
import { MessageReceiver } from "./messagereceiver";
/**
 * Message system
 * TODO: Should there be a que for the engine? [10/22] YES
 * TODO: [10/22] reworking things...
 */
export class MessageSystem implements System {
    public static set subscriptions(subscriptions: {[guid: string]: IMessageHandler[]}) {
        MessageSystem._subscriptions = subscriptions;
    }
    public static get subscriptions(): {[guid: string]: IMessageHandler[]} {
        return MessageSystem._subscriptions;
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
    private static _subscriptions: {[guid: string]: IMessageHandler[]};
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
    }
    public start(): void {

    }
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
     * Returns the count of all listeners in the system.
     * @returns number
     */
    public allSubscriptions(): number {
        return -1;
    }
    /**
     * Cleans up the Message system.
     * @returns void
     */
    public cleanup(): void {
        this.removeAllSubscriptions();
    }
    /**
     * @param  {EventType} et
     * @param  {IMessageHandler} handler
     * @returns void
     */
    public addSubscription(type: EventType, handler: IMessageHandler): void {
        if ( MessageSystem._subscriptions[type] !== undefined ) {
            MessageSystem._subscriptions[type] = [];
        }
        if ( MessageSystem._subscriptions[type].indexOf( handler ) !== -1 ) {
            LogWarning(ErrorCode.DuplicateSubscription, 
                `Attempting to add a duplicate handler to code:${type}. Subscription not added.`);
        } else {
            MessageSystem._subscriptions[type].push( handler );
        }
    }
    public removeSubscriptions(type: EventType, handler: IMessageHandler): void {
        if ( MessageSystem._subscriptions[type] === undefined ) {
            LogWarning(ErrorCode.UnsubscribeFailed, 
                `Cannot unsubscribe handler from code: ${type} Because that code is not subscribed to`);
            return;
        }
        let nodeIndex = MessageSystem._subscriptions[type].indexOf( handler );
        if ( nodeIndex !== -1 ) {
            MessageSystem._subscriptions[type].splice( nodeIndex, 1 );
        }
    }
    /**
     * Send a new message to the system. There needs to be either an EventType 
     * or a string. Recommended to make an enumerator list to define your
     * own classes. The message needs to extends from the base Message class.
     * @param type 
     * @param message 
     */
    public sendMessage(type: EventType | string, message: Message): void {
        Log(`Message posted: ${message}`);
        let handlers = MessageSystem._subscriptions[type];
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
     * Removes all subscriptions from the list.
     * @returns void
     */
    private removeAllSubscriptions(): void {
        MessageSystem.subscriptions = {};
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
    constructor(sender: any, priority: Priority) {
        this._id = guid();
        this._sender = sender;
        this._priority = priority;
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
    constructor( public data?: string | number) {
        super("TestMessage", Priority.Low);
        this.data = data;
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
    constructor() {
        super("EntityMessage", Priority.Normal);
    }
}

/**
 * Error system message interface. 
 * All error messages must extend this interface.
 */
export class ErrorSystemMessage extends Message {
    constructor( public errorCode: ErrorCode, public data: string | undefined ) {
        super("ErrorSystemMessage", Priority.Urgent);
        this.errorCode = errorCode;
        this.data = data;
    }
}

/**
 * IO system message interface. 
 * All io messages must extend this class.
 */
export class IOSystemMessage extends Message {
    constructor() {
        super("IOSystemMessage", Priority.Normal);
    }
}

/**
 * Physics system message interface. 
 * All physics messages must extend this interface.
 */
export class PhysicsSystemMessage extends Message {
    constructor() {
        super("PhysicsSystemMessage", Priority.Urgent);
    }
}

/**
 * Render system message  interface. 
 * All render messages must extend this interface.
 */
export class RenderSystemMessage extends Message {
    constructor( 
        public renderableComponent: RenderComponent) {
        super("RenderSystemMessage", Priority.Urgent);
        this.renderableComponent = renderableComponent;
    }
}

/**
 * Sound system message interface. 
 * All sound messages must extend this interface.
 */
export class SoundSystemMessage extends Message {
    constructor() {
        super("SoundSystemMessage", Priority.Normal);
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
    constructor( public x: number, 
        public y: number) {
        super();
        this.x = x;
        this.y = y;
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
