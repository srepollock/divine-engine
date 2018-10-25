import { guid } from "./helper";
import { LogDebug } from "./logging";
import { IMessageHandler, Message } from "./messagesystem";

/**
 * All objects begin passed as messages in the message system extend this 
 * object. They are ID'd on their string. The engine creates unique ID's for
 * each object to verify them.
 */
export class DObject implements IMessageHandler {
    public tag: string;
    private _guid: string;
    /**
     * DObject Constructor.
     * Tag is an additional identifier for the DObject.
     * @param  {string=""} tag Tag for the object to be identified on.
     */
    constructor(tag: string = "") {
        this._guid = guid();
        this.tag = tag;
    }
    /**
     * Gets the DObjects guid.
     * @returns string
     */
    public get guid(): string {
        return this._guid;
    }
    /**
     * DObjects base messasge handler receiving messages.
     * This can and most likely will be rewritten.
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        LogDebug(`${this.tag} receiving: ${message.JSONString}`);
    }
}
