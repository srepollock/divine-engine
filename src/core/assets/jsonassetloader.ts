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
     * Loads a JSON asset from file via XMLHttpRequest. 
     * If you are calling this from the command line, the file must be given as an aboslute path.
     * @param  {string} assetName Relative path for browser, full path for Electron/NodeJS (use __dirname)
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
            var remote = require("electron").remote;
            this._fs = remote.require("fs");
            this._path = require("path");
            this._fs.readFile(assetName, "utf8", (err: any, data: any) => {
                this.onJSONLoadedFs(this._path.basename(assetName, this._path.extname(assetName)), data);
            });
        } else if (Engine.client === Client.Console) {
            LogDebug(`${Engine.client}`); // NOTE: 0 = Console, 1 = Browser, 2 = Electron
            try {
                LogDebug(`JSONAssetLoader.loadAsset() assetName:${assetName}`);
                this._fs = require("fs");
                this._path = require("path");
                var data: string | undefined;
                this._fs.stat(assetName, "utf8", (err: any, stat: any) => {
                    if (err == null) {
                        this._fs.readFile(assetName, "utf8", (err: any, data: any) => {
                            LogDebug(`File loaded ${assetName}`);
                            this.onJSONLoadedFs(this._path.basename(assetName, this._path.extname(assetName)), data);
                        });
                    } else if (err.code === "ENOENT") {
                        // tslint:disable-next-line:max-line-length
                        LogError(ErrorCode.FileDoesNotExist, `Failed to read file ${this._path.join(__dirname, assetName)}. Does not exist`);
                    } else {
                        // tslint:disable-next-line:max-line-length
                        LogError(ErrorCode.LoadAssetFailed, `Unknown file read error on ${this._path.join(__dirname, assetName)}. This could be a permissions error`);
                    }
                });
                // REVIEW: This is currently failing, but I want to change to a dynamic promise load later
                // NOTE: ES6's optional imports. Must be enclosed in an if statement";
                // import("fs")
                // .then((fs) => {
                //     LogDebug("Trying to read file");
                //     fs.stat(assetName, (err: any, stat: any) => {
                //         if (err == null) {
                //             fs.readFile(assetName, "utf8", (err: any, data: any) => {
                //                 this.onJSONLoadedFs(assetName, data);
                //             });
                //         } else if (err.code === "ENOENT") {
                //             // tslint:disable-next-line:max-line-length
                // tslint:disable-next-line:max-line-length
                //             LogError(ErrorCode.FileDoesNotExist, `Failed to read file ${this._path.join(__dirname, assetName)}. Does not exist`);
                //         } else {
                //             // tslint:disable-next-line:max-line-length
                // tslint:disable-next-line:max-line-length
                //             LogError(ErrorCode.LoadAssetFailed, `Unknown file read error on ${this._path.join(__dirname, assetName)}. This could be a permissions error`);
                //         }
                //     });
                // })
                // .catch((error) => {
                //     trace(error);
                //     LogError(ErrorCode.JSONLoaderFsImport, "Promise error");
                // });
            } catch (e) {
                trace(e);
                // tslint:disable-next-line:max-line-length
                LogError(ErrorCode.FileContentsNotRead, `The file ${assetName} could not be read. Are you in the right directory?`);
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
        } else {
            LogError(ErrorCode.AssetManagerDidNotGetAsset, "Did not load the file");
        }
    }
    /**
     * Callback fucntion to laod the JSON object from Electron
     * @param  {string} assetName
     * @param  {string|Buffer} data
     * @returns void
     */
    private onJSONLoadedFs(assetName: string, data: string): void {
        LogDebug("onJSONLoadedFs function");
        if (data === undefined) {
            LogError(ErrorCode.JSONDataUndefined, "onJSONLoadedFs was given undefined data");
        } else if (data !== undefined) {
            let json = JSON.parse(data);
            // TODO: Remove the extension from the file name if there is one. 
            //      Else, throw a warning that there is no ext
            let asset = new JSONAsset(assetName, json);
            LogDebug(`Created asset: ${asset.name}`);
            AssetManager.onAssetLoaded(asset);
        } else {
            LogDebug("data: " + data);
            LogError(ErrorCode.AssetManagerDidNotGetAsset, "AssetManager did not recieve an asset.");
        }
    }
}
