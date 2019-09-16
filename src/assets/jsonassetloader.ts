import { AssetManager } from "./assetmanager";
import { IAssetLoader } from "./iassetloader";
import { JsonAsset } from "./jsonasset";

export class JsonAssetLoader implements IAssetLoader {
    /**
     * Gets the supported file extension.
     * @returns string
     */
    public get supportedExtensions(): string[] {
        return ["json"];
    }
    /**
     * Loads the asset through XML operation.
     * @param  {string} assetName
     * @returns void
     */
    public loadAsset(assetName: string): void {
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open("GET", assetName);
        request.addEventListener("load", this.onJsonLoaded.bind(this, assetName, request));
        request.send();
    }
    /**
     * Save the asset into the asset manager.
     * @param  {string} assetName
     * @param  {XMLHttpRequest} request
     * @returns void
     */
    private onJsonLoaded(assetName: string, request: XMLHttpRequest): void {
        console.log(`JsonAssetLoader.onJsonLoaded: assetName/request: ${assetName}/${request}.`);
        if (request.readyState === request.DONE) {
            let json: Object = JSON.parse(request.responseText);
            let asset = new JsonAsset(assetName, json);
            AssetManager.onAssetLoaded(asset);
        }
    }
}