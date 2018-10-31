import { IAsset } from "../../assets/iasset";
import { Priority } from "../messagesystem";
import { Message } from "./message";

export class AssetMessage extends Message {
    public asset: IAsset;
    constructor(sender: any, priority: Priority, asset: IAsset) {
        super(sender, priority);
        this.asset = asset;
    }
}