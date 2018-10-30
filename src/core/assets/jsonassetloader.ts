import { Engine } from "../engine"; // NOTE: this is now dependant on Engine?
import { Client } from "../helper";
import { ErrorCode, LogDebug, LogError, trace } from "../logging";
import { AssetManager } from "./assetmanager";
import { IAsset } from "./iasset";
import { IAssetLoader } from "./iassetloader";
var Fs: any;
var Path: any;

declare var XMLHttpRequest: {
    prototype: XMLHttpRequest;
    LOADING: number;
    DONE: number;
    UNSENT: number;
    OPENED: number;
    HEADERS_RECEIVED: number;
    new (): XMLHttpRequest;
};

export class JSONAsset implements IAsset {
    constructor(public name: string, public data: string) {
        
    }
}

export class JSONAssetLoader implements IAssetLoader {
    public readonly extensions: Array<string> = new Array<string>("json");
    private _fs: any = undefined;
    private _path: any = undefined;
    /**
     * Loads a JSON asset from file via XMLHttpRequest
     * @param  {string} assetName
     * @param  {boolean=true} extension
     * @returns void
     */
    public loadAsset( assetName: string, extension: boolean = true ): void {
        // NOTE: should this be in my IOSystem instead? Then passed as a message? Or should the loader handle it?
            // NOTE: Answer: either or is a fine choice.
        if (Engine.client === Client.Browser) {
            let request: XMLHttpRequest = new XMLHttpRequest();
            request.open( "GET", assetName );
            request.addEventListener( "load", this.onJsonLoadedWeb.bind( this, assetName, request ) );
            request.send();
        } else if (Engine.client === Client.Electron) {
            // NOTE: use the FS system from electron?
            var remote = require("electron").remote;
            this._fs = remote.require("fs");
            this._path = require("path");
            this._fs.readFile(this._path.join(__dirname, assetName), "utf8", (err: any, data: any) => {
                this.onJSONLoadedFs(assetName, data);
            });
        } else if (Engine.client === Client.Console) {
            // NOTE: use the FS system from NodeJS
            LogDebug(`${Engine.client}`); // 0 = Console, 1 = Browser, 2 = Electron
            this._fs = require("fs");
            try {
                LogDebug(`JSONAssetLoader.loadAsset() assetName:${assetName}`);
                this._path = require("path");
                this._fs.readFile(this._path.join(__dirname, assetName), "utf8", (err: any, data: any) => {
                    this.onJSONLoadedFs(assetName, data);
                });
            } catch (e) {
                trace(e);
                LogError(ErrorCode.FileContentsNotRead, `The file ${assetName} could not be read. Are you in the right
                    directory?`);
            }
        } else {
            LogError(ErrorCode.EngineClientNotSet, `Engine clinet is not set.`);
        }
    }
    /**
     * Callback function to load the JSON object from Browser
     * @param  {string} assetName
     * @param  {XMLHttpRequest} request
     * @returns void
     */
    private onJsonLoadedWeb( assetName: string, request: XMLHttpRequest ): void {
        LogDebug( "onJsonLoaded: assetName/request" + assetName + request);
        if (request.readyState === request.DONE) {
            let json = JSON.parse(request.responseText);
            // TODO: Remove the extension from the file name if there is one. 
            //      Else, throw a warning that there is no ext
            let asset = new JSONAsset(assetName, json);
            AssetManager.onAssetLoaded(asset);
        }
    }
    /**
     * Callback fucntion to laod the JSON object from Electron
     * @param  {string} assetName
     * @param  {string|Buffer} data
     * @returns void
     */
    private onJSONLoadedFs(assetName: string, data: string | Buffer): void {
        if (data instanceof Buffer) {
            LogDebug("JSON Data loaded is instance of data");
        } else {
            let json = JSON.parse(data);
            // TODO: Remove the extension from the file name if there is one. 
            //      Else, throw a warning that there is no ext
            let asset = new JSONAsset(assetName, json);
            AssetManager.onAssetLoaded(asset);
        }
    }
}
