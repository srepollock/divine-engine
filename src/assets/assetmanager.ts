import { IAsset } from "../assets/iasset";
import { IAssetLoader } from "../assets/iassetloader";
import { ImageAssetLoader } from "../assets/imageassetloader";
import { JsonAssetLoader } from "../assets/jsonassetloader";
import { Message } from "../core/messagesystem/message";

export class AssetManager {
    public static readonly MESSAGE_ASSET_LOADER_ASSET_LOADED: string = "MESSAGE_ASSET_LOADER_ASSET_LOADED";
    private static _loaders: Array<IAssetLoader> = new Array();
    private static _loadedAssets: Map<string, IAsset> = new Map();
    constructor() {

    }
    public static onAssetLoaded(asset: IAsset): void {
        AssetManager._loadedAssets.set(asset.name, asset);
        Message.send(AssetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset);
    }
    public static loadAsset(assetName: string): void {
        let extension = assetName.split(".").pop()!.toLowerCase();
        this._loaders.forEach((loader) => {
            if (loader.supportedExtensions.includes(extension)) {
                loader.loadAsset(assetName);
                return;
            }
        });
    }
    public static isAssetLoaded(assetName: string): boolean {
        return AssetManager._loadedAssets.get(assetName) !== undefined;
    }
    public static getAsset(assetName: string): IAsset | undefined {
        if (AssetManager.isAssetLoaded(assetName)) {
            return AssetManager._loadedAssets.get(assetName);
        } else {
            AssetManager.loadAsset(assetName);
        }
        return undefined;
    }
    public static initialize(): void {
        AssetManager._loaders.push(new ImageAssetLoader());
        AssetManager._loaders.push(new JsonAssetLoader());
    }
    public registerLoader(loader: IAssetLoader): void {
        AssetManager._loaders.push(loader);
    }
}