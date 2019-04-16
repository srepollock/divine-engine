import { AssetManager } from "./assetmanager";
import { IAssetLoader } from "./iassetloader";

export class ImageAsset {
    constructor(public name: string, public data: HTMLImageElement) {
        
    }
}

export class ImageAssetLoader implements IAssetLoader {
    public extensions: Array<string> = new Array<string>("jpg", "png", "tif"); // REVIEW: gif?
    public loadAsset(name: string, extension: boolean = true): void {
        let image: HTMLImageElement = new Image();
        image.onload = this.onImageLoaded.bind( this, name, image );
        image.src = name;
    }
    private onImageLoaded( name: string, image: HTMLImageElement ): void {
        console.log( "onImageLoaded: name/image", name, image );
        let asset = new ImageAsset( name, image );
        AssetManager.onAssetLoaded( asset );
    }
}  