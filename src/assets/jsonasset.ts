import { IAsset } from "./iasset";

export class JsonAsset implements IAsset {
    public readonly name: string;
    public readonly data: any;
    constructor(name: string, data: any) {
        this.name = name;
        this.data = data;
    }
}