import { AssetManager } from "./assetmanager";
import { IAsset } from "./iasset";
import { IAssetLoader } from "./iassetloader";

export class JSONAsset implements IAsset {
    constructor(public name: string, public data: string) {
        
    }
}

export class JSONAssetLoader implements IAssetLoader {
    public readonly extensions: Array<string> = new Array<string>("json");
    public loadAsset( assetName: string, extension: boolean = true ): void {
        let request: XMLHttpRequest = new XMLHttpRequest();
        request.open( "GET", assetName );
        request.addEventListener( "load", this.onJsonLoaded.bind( this, assetName, request ) );
        request.send();
    }

    private onJsonLoaded( assetName: string, request: XMLHttpRequest ): void {
        console.log( "onJsonLoaded: assetName/request", assetName, request );

        if ( request.readyState === request.DONE ) {
            let json = JSON.parse( request.responseText );
            let asset = new JSONAsset( assetName, json );
            AssetManager.onAssetLoaded( asset );
        }
    }
}