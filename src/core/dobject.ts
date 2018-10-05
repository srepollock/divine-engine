import { MessageReceiver } from ".";
/**
 * All objects begin passed as messages in the message system extend this 
 * object. They are ID'd on their string. The engine creates unique ID's for
 * each object to verify them.
 */
export class DObject implements MessageReceiver {
    public tag: string;
    private _id: string;
    constructor(tag: string = "") {
        this._id = this.createID();
        this.tag = tag;
    }
    public get id(): string {
        return this._id;
    }
    private createID(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
