import { AssetManager } from "./assetmanager";
import { IAssetLoader } from "./iassetloader";
import { ImageAsset } from "./imageasset";

export class ImageAssetLoader implements IAssetLoader {
    public get supportedExtensions(): string[] {
        return ["png", "gif", "jpg", "jpeg"];
    }
    public loadAsset(assetName: string): void {
        let image: HTMLImageElement = new Image();
        image.onload = this.onImageLoaded.bind(this, assetName, image);
        image.src = assetName;
    }
    private onImageLoaded(assetName: string, image: HTMLImageElement): void {
        console.log(`ImageAssetLoader.onImageLoaded: asset/image: ${assetName}.`);
        let asset = new ImageAsset(assetName, image);
        AssetManager.onAssetLoaded(asset);
    }
}