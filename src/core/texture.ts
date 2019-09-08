import { AssetManager } from "../assets/assetmanager";
import { ImageAsset } from "../assets/imageasset";
import { IMessageHandler } from "../core/messagesystem/imessagehandler";
import { Message } from "../core/messagesystem/message";
import { GLUtility } from "../rendersystem/glutility";

export class Texture implements IMessageHandler {
    public static readonly LEVEL: number = 0;
    public static readonly BOARDER: number = 0;
    public static readonly TEMP_IMAGE_DATA: Uint8Array = new Uint8Array([255, 255, 255, 255]);
    private _name: string;
    private _handle: WebGLTexture;
    private _isLoaded: boolean = false;
    private _width: number;
    private _height: number;
    public get name(): string {
        return this._name;
    }
    public get isLoaded(): boolean {
        return this._isLoaded;
    }
    public get height(): number {
        return this._height;
    }
    public get width(): number {
        return this._width;
    }
    constructor(name: string, width: number = 1, height: number = 1) {
        this._name = name;
        this._width = width;
        this._height = height;
        this._handle = GLUtility.gl.createTexture()!;
        Message.subscribe(AssetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + this._name, this);
        this.bind();
        GLUtility.gl.texImage2D(GLUtility.gl.TEXTURE_2D, Texture.LEVEL, GLUtility.gl.RGBA, 1, 1, 
            Texture.BOARDER, GLUtility.gl.RGBA, GLUtility.gl.UNSIGNED_BYTE, Texture.TEMP_IMAGE_DATA);
        let asset = AssetManager.getAsset(this._name);
        if (asset !== undefined) {
            this.loadTextureFromAsset((asset as ImageAsset));
        }
    }
    public activateAndBind(textureUnit: number = 0): void {
        GLUtility.gl.activeTexture(GLUtility.gl.TEXTURE0 + textureUnit);
        this.bind();
    }
    public bind(): void {
        GLUtility.gl.bindTexture(GLUtility.gl.TEXTURE_2D, this._handle);
    }
    public destroy(): void {
        GLUtility.gl.deleteTexture(this._handle);
    }
    public onMessage(message: Message): void {
        if (message.code === AssetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + this._name) {
            this.loadTextureFromAsset(message.context as ImageAsset);
        }
    }
    public unbind(): void {
        GLUtility.gl.bindTexture(GLUtility.gl.TEXTURE_2D, null);
    }
    private loadTextureFromAsset(asset: ImageAsset): void {
        this._width = asset.width;
        this._height = asset.height;
        this.bind();
        GLUtility.gl.texImage2D(GLUtility.gl.TEXTURE_2D, Texture.LEVEL, GLUtility.gl.RGBA, GLUtility.gl.RGBA, 
            GLUtility.gl.UNSIGNED_BYTE, asset.data);
        if (this.isPowerOf2()) {
            GLUtility.gl.generateMipmap(GLUtility.gl.TEXTURE_2D);
        } else {
            GLUtility.gl.texParameteri(GLUtility.gl.TEXTURE_2D, GLUtility.gl.TEXTURE_WRAP_S, 
                GLUtility.gl.CLAMP_TO_EDGE);
            GLUtility.gl.texParameteri(GLUtility.gl.TEXTURE_2D, GLUtility.gl.TEXTURE_WRAP_T, 
                GLUtility.gl.CLAMP_TO_EDGE);
        }
        // TODO: Set texture filtering based on config
        GLUtility.gl.texParameteri(GLUtility.gl.TEXTURE_2D, GLUtility.gl.TEXTURE_MIN_FILTER, GLUtility.gl.NEAREST);
        GLUtility.gl.texParameteri(GLUtility.gl.TEXTURE_2D, GLUtility.gl.TEXTURE_MAG_FILTER, GLUtility.gl.NEAREST);
        this._isLoaded = true;
    }
    private isPowerOf2(): boolean {
        return this.isValuePowreOf2(this._width) && this.isValuePowreOf2(this._height);
    }
    private isValuePowreOf2(value: number): boolean {
        return (value & (value - 1)) === 0;
    }
}