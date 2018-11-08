import { Priority } from "../messagesystem";
import { Message } from "./message";

export class SceneManagerMessage extends Message {
    constructor(sender: any, data: string) {
        super(sender, Priority.Normal, data);
    }
}