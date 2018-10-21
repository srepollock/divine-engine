import { guid } from "./helperfunctions";

/**
 * All objects begin passed as messages in the message system extend this 
 * object. They are ID'd on their string. The engine creates unique ID's for
 * each object to verify them.
 */
export class DObject {
    public tag: string;
    private _guid: string;
    constructor(tag: string = "") {
        this._guid = guid();
        this.tag = tag;
    }
    public get guid(): string {
        return this._guid;
    }
}
