import { EventEmitter } from "events";
import { RenderComponent } from "../components/rendercomponent";
import { guid } from "./helperfunctions";
import { ErrorCode } from "./logging";
/**
 * Message system
 * TODO: Should there be a que for the engine?
 */
export class MessageSystem extends EventEmitter {
    /**
     * Message system constructor.
     */
    constructor() {
        super();
    }
    /**
     * Send a new message to the system. There needs to be either an EventType 
     * or a string. Recommended to make an enumerator list to define your
     * own classes. The message needs to extends from the base Message class.
     * @param type 
     * @param message 
     */
    public sendMessage(type: EventType | string, message: Message): void {
        this.emit(type, message);
    }
    /**
     * Returns the count of all listeners in the system.
     * @returns number
     */
    public allListenersCount(): number {
        var count: number = 0;
        var events = this.eventNames();
        events.forEach((element) => {
            count += this.listenerCount(element);
        });
        return count;
    }
    /**
     * Shutsdown the message system.
     * @returns void
     */
    public shutdown(): void {
        this.cleanup();
    }
    /**
     * Cleans up the Message system.
     * @returns void
     */
    private cleanup(): void {
        this.removeAllListeners();
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
    constructor() {
        this._id = guid();
    }
    public get id(): string {
        return this._id;
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
        super();
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
        super();
    }
}

/**
 * Error system message interface. 
 * All error messages must extend this interface.
 */
export class ErrorSystemMessage extends Message {
    constructor( public errorCode: ErrorCode, public data: string | undefined ) {
        super();
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
        super();
    }
}

/**
 * Physics system message interface. 
 * All physics messages must extend this interface.
 */
export class PhysicsSystemMessage extends Message {
    constructor() {
        super();
    }
}

/**
 * Render system message  interface. 
 * All render messages must extend this interface.
 */
export class RenderSystemMessage extends Message {
    constructor( 
        public renderableComponent: RenderComponent) {
        super();
        this.renderableComponent = renderableComponent;
    }
}

/**
 * Sound system message interface. 
 * All sound messages must extend this interface.
 */
export class SoundSystemMessage extends Message {
    constructor() {
        super();
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
