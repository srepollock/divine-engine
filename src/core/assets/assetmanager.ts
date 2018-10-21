import { ErrorCode, LogWarning } from "../logging";
import { AssetMessage } from "../messagesystem/assetmessage";
import { EventType, Message, Priority } from "../messagesystem/messagesystem";
import { IAsset } from "./iasset";
import { IAssetLoader } from "./iassetloader";
import { ImageAssetLoader } from "./imageassetloader";
import { JSONAssetLoader } from "./jsonassetloader";

export class AssetManager {
    public static get loadedAssets(): {[name: string]: IAsset} {
        return AssetManager._loadedAssets;
    }
    public static get loaders(): IAssetLoader[] {
        return AssetManager._loaders;
    }
    public static get instance(): AssetManager {
        return AssetManager._instance;
    }
    private static _instance: AssetManager;
    private static _loadedAssets: {[name: string]: IAsset} = {};
    private static _loaders: IAssetLoader[] = [];
    public _subscriptions: Array<string> = new Array<string>();
    private constructor() {

    }
    public static initialize(): void {
        AssetManager._loaders.push(new ImageAssetLoader());
        AssetManager._loaders.push(new JSONAssetLoader());
    }
    public static registerLoader(loader: IAssetLoader): void {
        AssetManager.loaders.push(loader);
    }
    public static loadAsset(name: string): void {
        try { 
            let fileExtension = name.split(".")!.pop()!.toLowerCase();
            for (let l of AssetManager._loaders) {
                if (l.extensions.indexOf(fileExtension) !== -1) {
                    l.loadAsset(name);
                    return;
                }
            }
        } catch (e) { 
            LogWarning(ErrorCode.NoFileExtension, `File extension has no file ending ${name} given. \
                continuing to read as a JSON file but may cause errors later.`);
        }
        new JSONAssetLoader().loadAsset(name, false);
    }
    public static isAssetLoaded(name: string): boolean {
        return AssetManager.loadedAssets[name] !== undefined;
    }
    public static getAsset(name: string): IAsset | undefined {
        if (AssetManager.loadedAssets[name] !== undefined) {
            return AssetManager.loadedAssets[name];
        } else {
            AssetManager.loadAsset(name); // NOTE: Names must be unique then.
        }
        return undefined;
    }
    public static onAssetLoaded(asset: IAsset): void {
        AssetManager._loadedAssets[asset.name] = asset;
        AssetManager.instance.sendMessage(EventType.IOSystem, 
            new AssetMessage(this, Priority.Normal, asset));
    }
    public sendMessage(event: string, data: Message): void {

    }
    public addSubscription(event: string, handler: () => {}): void {

    }
    public removeSubscription(event: string): void {

    }
    public basicMessageHandler(message: Message): void {

    }
}