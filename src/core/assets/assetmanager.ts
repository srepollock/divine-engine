
import { DObject } from "../dobject";
import { ErrorCode, LogDebug, LogWarning } from "../logging";
import { AssetMessage, Message } from "../messagesystem/messages/";
import { EventType, MessageSystem, Priority } from "../messagesystem/messagesystem";
import { IAsset } from "./iasset";
import { IAssetLoader } from "./iassetloader";
import { ImageAssetLoader } from "./imageassetloader";
import { JSONAssetLoader } from "./jsonassetloader";

export class AssetManager extends DObject {
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
        super();
    }
    public static initialize(): void {
        AssetManager._instance = new AssetManager();
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
            // tslint:disable-next-line:max-line-length
            LogWarning(ErrorCode.NoFileExtension, `File extension has no file ending ${name} given, continuing to read as a JSON file but may cause errors later.`);
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
        LogDebug(AssetManager._loadedAssets[asset.name].name);
        AssetManager.instance.sendMessage(EventType.IOSystem, 
            new AssetMessage(this, Priority.Normal, asset));
    }
    /**
     * Sends message of event type to message system.
     * @param  {string} event
     * @param  {Message} message
     * @returns void
     */
    public sendMessage(event: string, message: Message): void {
        MessageSystem.sendMessage(event, message);
    }
    /**
     * Called when the asset is loaded.
     * @param  {IAsset} asset
     * @returns void
     */
    public onAssetLoaded(asset: IAsset): void {
        AssetManager._loadedAssets[asset.name] = asset;
    }
}