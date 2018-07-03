import { EventEmitter } from "events";
import { RenderComponent } from "src/components/rendercomponent";

/**
 * Message system
 */
export class MessageSystem extends EventEmitter {
    /**
     * Message system constructor.
     */
    constructor() {
        super();
    }
    /**
     * Send a new message to the system.
     * @param type type of message to send. Either EventType or string
     * @param message the message to send as data
     */
    public sendMessage(type: EventType | string, message: Message): void {
        this.emit(type, message);
    }
    public allListenersCount(): number {
        var count: number = 0;
        var events = this.eventNames();
        events.forEach((element) => {
            count += this.listenerCount(element);
        });
        return count;
    }
}

/**
 * Message object.
 * The data is saved as a JSON object in string format. It will be parsed based
 * on it's message type. Listeners have a specific format based on interface.
 */
export class Message {
    private _data: string;
    /**
     * Message constructor
     * @param data DObject or a string in JSON format of information to pass.
     * The objects can now be passed by template type as well. Will set a file
     * for message templates later 
     * Plus there may be some NOTE: networking 
     * capabilities in the future with his advantage.
     */
    constructor( data: MessageData ) {
            this._data = data.getJSONString();
    }
    
    /**
     * Returns the data as a JSON string object.
     * @returns string.
     */
    public get JSONString(): string {
        return this._data;
    }
    /**
     * Returns the JSON object.
     * @returns JSON
     */
    public get JSON(): JSON {
        return JSON.parse(this._data);
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
 *  These are all the core MessageTypes that the system will handle. The 
 *  messages here correspond with the enumerator class `EventType` defined in 
 *  `messagesystem.ts`. For your own messages and message types, please save an
 *  enumerated list in your own message types file and extend these classes 
 *  there as well. 
 *  
 *  Instructions:
 *  -------------
 *  All must define a printMessage function.
 */
/**
 * Base message data interface(class).
 * All messages must extend from this class.
 *  
 *  data: is a JSON string object.
 */
export class MessageData {
    constructor() {

    }
    /**
     * Returns JSON object.
     * @returns JSON JSON object
     */
    public getJSON(): JSON {
        return JSON.parse(this.getJSONString());
    }
    /**
     * Returns string JSON object.
     * @returns string JSON object as string
     */
    public getJSONString(): string {
        return JSON.stringify(this);
    }
}

/**
 * EntityMessages interface. 
 * All entity messages must extend this interface.
 */
export class EntityMessage extends MessageData {}

/**
 * Error system message interface. 
 * All error messages must extend this interface.
 */
export class ErrorSystemMessage extends MessageData {}

/**
 * IO system message interface. 
 * All io messages must extend this class.
 */
export class IOSystemMessage extends MessageData {}

/**
 * Physics system message interface. 
 * All physics messages must extend this interface.
 */
export class PhysicsSystemMessage extends MessageData {
    private _entityID: string;
    constructor(entityID: string) {
        super();
        this._entityID = entityID;
    }
    public getJSON(): JSON {
        return JSON.parse(this.getJSONString());
    }
    public getJSONString(): string {
        return JSON.stringify(this);
    }
    public get entityID(): string {
        return this._entityID;
    }
}

/**
 * Render system message  interface. 
 * All render messages must extend this interface.
 */
export class RenderSystemMessage extends MessageData {
    private _entityID: string;
    private _renderableComponent: RenderComponent;
    constructor(entityID: string, renderableComponent: RenderComponent) {
        super();
        this._entityID = entityID;
        this._renderableComponent = this.renderableComponent;
    }
    public getJSON(): JSON {
        return JSON.parse(this.getJSONString());
    }
    public getJSONString(): string {
        return JSON.stringify(this);
    }
    public get entityID(): string {
        return this._entityID;
    }
    public get renderableComponent(): RenderComponent {
        return this._renderableComponent;
    }
}

/**
 * Sound system message interface. 
 * All sound messages must extend this interface.
 */
export class SoundSystemMessage extends MessageData {
    constructor() {
        super();
    }
    public getJSON(): JSON {
        return JSON.parse(this.getJSONString());
    }
    public getJSONString(): string {
        return JSON.stringify(this);
    }
}
/**             ----------------
 *              END CORE CLASSES
 *              ----------------
 */

/**
 * Key input message interface.
 */
export class KeyInputMessage extends IOSystemMessage {
    private _code: string;
    constructor(code: string) {
        super();
        this._code = code;
    }
    public code(): string {
        return this._code;
    }
    public getJSON(): JSON {
        return JSON.parse(this.getJSONString());
    }
    public getJSONString(): string {
        return JSON.stringify(this);
    }
}
/**
 * Mouse input message interface.
 */
export class MouseInputMessage extends IOSystemMessage {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        super();
        this._x = x;
        this._y = y;
    }
    public x(): number {
        return this._x;
    }
    public y(): number {
        return this._y;
    }
    public getJSON(): JSON {
        return JSON.parse(this.getJSONString());
    }
    public getJSONString(): string {
        return JSON.stringify(this);
    }
}
/**
 * Touch input message interface.
 */
export class TouchInputMessage extends IOSystemMessage {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        super();
        this._x = x;
        this._y = y;
    }
    public x(): number {
        return this._x;
    }
    public y(): number {
        return this._y;
    }
    public getJSON(): JSON {
        return JSON.parse(this.getJSONString());
    }
    public getJSONString(): string {
        return JSON.stringify(this);
    }
}