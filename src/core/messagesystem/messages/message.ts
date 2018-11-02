import { guid } from "../../helper";
import { Priority } from "../messagesystem";
/**
 * Message object.
 * The data is saved as a JSON object in string format. It will be parsed based
 * on it's message type. Listeners have a specific format based on interface.
 * 
 * Base message data interface(class).
 * All messages must extend from this class.
 * 
 * data: is a JSON string object.
 * 
 *              --------------------------
 *              CORE CLASSES AFTER MESSAGE
 *              --------------------------
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
 * 
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
    /**
     * Get's this message's GUID.
     * @returns string
     */
    public get id(): string {
        return this._id;
    }
    /**
     * Gets this message's sender.
     * @returns any
     */
    public get sender(): any {
        return this._sender;
    }
    /**
     * Gets this message's priority.
     * @returns Priority
     */
    public get priority(): Priority {
        return this._priority;
    }
    /**
     * Gets this message's data.
     * @returns string
     */
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