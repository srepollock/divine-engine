import { IAsset } from "../assets/iasset";
import { Message, Priority } from "./messagesystem";

export class AssetMessage extends Message {
    public asset: IAsset;
    constructor(sender: any, priority: Priority, asset: IAsset) {
        super(sender, priority);
        this.asset = asset;
    }
}