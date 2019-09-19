import { IAsset } from "../assets/iasset";
import { IAssetLoader } from "../assets/iassetloader";
import { ImageAssetLoader } from "../assets/imageassetloader";
import { JsonAssetLoader } from "../assets/jsonassetloader";
import { Message } from "../core/messagesystem/message";

export class AssetManager {
    public static readonly MESSAGE_ASSET_LOADER_ASSET_LOADED: string = "MESSAGE_ASSET_LOADER_ASSET_LOADED";
    private static _loaders: Array<IAssetLoader> = new Array();
    private static _loadedAssets: Map<string, IAsset> = new Map();
    /**
     * Called when the asset is loaded. Sends a message letting any listeners know the asset specified is loaded.
     * @param  {IAsset} asset
     * @returns void
     */
    public static onAssetLoaded(asset: IAsset): void {
        AssetManager._loadedAssets.set(asset.name, asset);
        Message.send(AssetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset);
    }
    /**
     * Loads an asset based on the file type with a loader in the asset manager.
     * Throws an error if the asset is not loaded.
     * 
     * @see IAssetLoader
     * @param  {string} assetName
     * @returns void
     */
    public static loadAsset(assetName: string): void {
        let extension = assetName.split(".").pop()!.toLowerCase();
        this._loaders.forEach((loader) => {
            if (loader.supportedExtensions.includes(extension)) {
                loader.loadAsset(assetName);
                return;
            }
        });
    }
    /**
     * Checks if the asset is loaded or not.
     * @param  {string} assetName
     * @returns boolean
     */
    public static isAssetLoaded(assetName: string): boolean {
        return AssetManager._loadedAssets.get(assetName) !== undefined;
    }
    /**
     * Gets loaded asset by the asset name.
     * @param  {string} assetName
     * @returns IAsset
     */
    public static getAsset(assetName: string): IAsset | undefined {
        if (AssetManager.isAssetLoaded(assetName)) {
            return AssetManager._loadedAssets.get(assetName);
        } else {
            AssetManager.loadAsset(assetName);
        }
        return undefined;
    }
    /**
     * Initializes the asset loadeer with the standard loaders; JSON and Images (png, gif, jpg)
     * @see ImageAssetLoader
     * @see JsonAssetLoader
     * @returns void
     */
    public static initialize(): void {
        AssetManager._loaders.push(new ImageAssetLoader());
        AssetManager._loaders.push(new JsonAssetLoader());
    }
    /**
     * Registers a new loader to the engine. This can be called with user defined loaders.
     * @param  {IAssetLoader} loader
     * @returns void
     */
    public registerLoader(loader: IAssetLoader): void {
        AssetManager._loaders.push(loader);
    }
}