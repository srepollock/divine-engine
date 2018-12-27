
import { DObject } from "../dobject";
import { ErrorCode, LogDebug, LogError, LogWarning } from "../logging";
import { AssetMessage } from "../messagesystem/messages/";
import { EventType, MessageSystem, Priority } from "../messagesystem/messagesystem";
import { IAsset } from "./iasset";
import { IAssetLoader } from "./iassetloader";
import { ImageAssetLoader } from "./imageassetloader";
import { JSONAssetLoader } from "./jsonassetloader";

/**
 * Asset Manager class
 * Load Asset example:
 * 1) When an asset is required, send a message to the IOSystem. ex: IOSystemMessage(data: filename)
 * 2) IOSystem recieves message and calls AssetManager.load(filename); on complete, sends an AssetMessage
 * 3) SceneManager recieves all AssetMessages (as the Scene in SceneManager will hold the loaded assets)
 * 4) SceneManager.Scene contains the asset for updating
 */
export class AssetManager extends DObject {
    /**
     * Gets the list of loaded assets.
     * @returns IAsset
     */
    public static get loadedAssets(): {[name: string]: IAsset} {
        return AssetManager._loadedAssets;
    }
    /**
     * Gets the list of loaders in the asset manager.
     * @returns IAssetLoader
     */
    public static get loaders(): IAssetLoader[] {
        return AssetManager._loaders;
    }
    /**
     * Gets the AssetManager instance.
     * @returns AssetManager
     */
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
    /**
     * Sets up the asset manager for usage in the engine.
     * @returns void
     */
    public static start(): void {
        AssetManager._instance = new AssetManager();
        AssetManager._loaders.push(new ImageAssetLoader());
        AssetManager._loaders.push(new JSONAssetLoader());
    }
    /**
     * Registers a new IAssetLoader to the AssetManager's list of loaders.
     * @param  {IAssetLoader} loader
     * @returns void
     */
    public static registerLoader(loader: IAssetLoader): void {
        AssetManager.loaders.push(loader);
    }
    /**
     * Load asset takes the full path of the file as a string.
     * @param {string}: name
     */
    public static loadAsset(name: string): void {
        try { 
            let fileExtension = name.split(".")!.pop()!.toLowerCase();
            for (let l of AssetManager._loaders) {
                if (l.extensions.indexOf(fileExtension) !== -1) {
                    l.loadAsset(name);
                    return;
                }
            }
            throw new Error(); // NOTE: This will be caught
        } catch (e) { 
            // tslint:disable-next-line:max-line-length
            LogWarning(ErrorCode.LoadAssetFailed, `AssetManager failed to load the asset: ${name}`);
        }
    }
    /**
     * Loads an an object into the AssetManager.
     * This is a dangerous function as we can load any object then...
     * NOTE: Data is a stringified object.
     * @param  {object} obj Object **MUST** have a type of name
     * @returns void
     */
    public static loadObjectAsset(obj: any): void {
        if (obj === undefined) {
            LogWarning(ErrorCode.JSONDataUndefined, "Object given to loadObjectAsset was undefined.");
            return;
        }
        if (obj.name === undefined) {
            LogError(ErrorCode.NoAssetName, `Object was given with no name: ${JSON.stringify(obj)}`);
            return;
        }
        // REVIEW: Construct inner Asset class to load. This is dangerous...
        class Asset implements IAsset {
            constructor(public name: string, public data: string) {}
        }
        this.onAssetLoaded(new Asset(obj.name, JSON.stringify(obj)));
        return;
    }
    /**
     * Checks if the asset is loaded into the manager or not.
     * @param  {string} name
     * @returns boolean
     */
    public static isAssetLoaded(name: string): boolean {
        return AssetManager.loadedAssets[name] !== undefined;
    }
    /**
     * Get's the asset from the manager if found, else try and load the asset and return the loaded asset.
     * If no asset is found or no asset gets loaded, returns an undefined.
     * @param  {string} name
     * @returns IAsset
     */
    public static getAsset(name: string): IAsset | undefined {
        if (AssetManager.isAssetLoaded(name)) {
            LogDebug(`Found asset ${name}`);
            return AssetManager.loadedAssets[name];
        } else {
            AssetManager.loadAsset(name); // NOTE: Names must be unique then.
            if (AssetManager.isAssetLoaded(name)) { // NOTE: Now check if asset loaded
                return AssetManager.loadedAssets[name];
            } else {
                // tslint:disable-next-line:max-line-length
                LogError(ErrorCode.LoadAssetFailed, `Get asset failed. Either the asset is not loaded or could not be loaded. Filename: ${name}`);
            }
        }
        return undefined; // NOTE: Asset was not loaded
    }
    /**
     * Callback function from the AssetLoaders. This will load the given asset into the AssetManager.
     * @param  {IAsset} asset
     * @returns void
     */
    public static onAssetLoaded(asset: IAsset): void {
        LogDebug(`AssetManager loading asset: ${asset.name}`);
        AssetManager._loadedAssets[asset.name] = asset;
        LogDebug(AssetManager._loadedAssets[asset.name].name);
        MessageSystem.sendMessage(EventType.IOSystem, new AssetMessage(this, Priority.Normal, asset));
    }
    /**
     * Calls the AssetManagers cleanup function.
     * @returns void
     */
    public static shutdown(): void {
        this._instance.cleanup();
    }
    /**
     * Cleanups the loaded assets in the manager.
     * @returns void
     */
    public cleanup(): void {
        AssetManager._loadedAssets = {}; // NOTE: Unloads the assets.
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
