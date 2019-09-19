import { AssetManager } from "./assetmanager";
import { IAssetLoader } from "./iassetloader";
import { ImageAsset } from "./imageasset";

export class ImageAssetLoader implements IAssetLoader {
    /**
     * Gets the supported file extensions.
     * @returns string
     */
    public get supportedExtensions(): string[] {
        return ["png", "gif", "jpg", "jpeg"];
    }
    /**
     * Loads the image from source.
     * @param  {string} assetName
     * @returns void
     */
    public loadAsset(assetName: string): void {
        let image: HTMLImageElement = new Image();
        image.onload = this.onImageLoaded.bind(this, assetName, image);
        image.src = assetName;
    }
    /**
     * Save the asset into the asset manager.
     * @param  {string} assetName
     * @param  {HTMLImageElement} image
     * @returns void
     */
    private onImageLoaded(assetName: string, image: HTMLImageElement): void {
        console.log(`ImageAssetLoader.onImageLoaded: asset/image: ${assetName}.`);
        let asset = new ImageAsset(assetName, image);
        AssetManager.onAssetLoaded(asset);
    }
}