import { Engine } from "../engine"; // NOTE: this is now dependant on Engine?
import { Client } from "../helper";
import { AssetManager } from "./assetmanager";
import { IAsset } from "./iasset";
import { IAssetLoader } from "./iassetloader";
import { LogLevel, ErrorCode, log } from "../loggingsystem/src";
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
            try {
                let fileExtension = assetName.split(".")!.pop()!.toLowerCase();
                // tslint:disable-next-line:max-line-length
                if (fileExtension === undefined) log(LogLevel.debug,`No extension on file ${assetName}`, ErrorCode.NoFileExtension);
                this._fs = require("fs");
                this._path = require("path");
                var data: string | undefined;
                this._fs.readFile(assetName, "utf8", (err: any, data: any) => {
                    if (err) {
                        throw new Error();
                    }
                    log(LogLevel.debug,`File loaded ${assetName}`);
                    this.onJSONLoadedFs(this._path.basename(assetName, this._path.extname(assetName)), data);
                    return;
                });
            } catch (e) {
                log(LogLevel.error, `${e}`);
                // tslint:disable-next-line:max-line-length
                log(LogLevel.error,`The file ${assetName} could not be read. Are you in the right directory?`, ErrorCode.FileContentsNotRead);
            }
        } else {
            log(LogLevel.error, `Engine clinet is not set.`, ErrorCode.EngineClientNotSet);
        }
    }
    /**
     * Callback function to load the JSON object from Browser
     * @param  {string} assetName
     * @param  {XMLHttpRequest} request
     * @returns void
     */
    private onJsonLoadedWeb( assetName: string, request: XMLHttpRequest ): void {
        if (request.readyState === request.DONE) {
            let json = JSON.parse(request.responseText);
            // TODO: Remove the extension from the file name if there is one. 
            //      Else, throw a warning that there is no ext
            let asset = new JSONAsset(assetName, json);
            log(LogLevel.debug,`Created asset: ${asset.name}`);
            AssetManager.onAssetLoaded(asset);
        } else {
            log(LogLevel.error, "Did not load the file", ErrorCode.AssetManagerDidNotGetAsset);
        }
    }
    /**
     * Callback fucntion to laod the JSON object from Electron
     * @param  {string} assetName
     * @param  {string|Buffer} data
     * @returns void
     */
    private onJSONLoadedFs(assetName: string, data: string): void {
        if (data === undefined) {
            log(LogLevel.error,"onJSONLoadedFs was given undefined data", ErrorCode.JSONDataUndefined);
        } else if (data !== undefined) {
            let json = JSON.parse(data);
            // TODO: Remove the extension from the file name if there is one. 
            //      Else, throw a warning that there is no ext
            let asset = new JSONAsset(assetName, json);
            log(LogLevel.debug,`Created asset: ${asset.name}`);
            AssetManager.onAssetLoaded(asset);
        } else {
            log(LogLevel.debug,"data: " + data);
            log(LogLevel.error,"AssetManager did not recieve an asset.", ErrorCode.AssetManagerDidNotGetAsset);
        }
    }
}
