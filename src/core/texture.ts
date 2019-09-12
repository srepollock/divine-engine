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
    /**
     * Gets the name of the texture.
     * @returns string
     */
    public get name(): string {
        return this._name;
    }
    /**
     * Gets if the texture is loaded.
     * @returns boolean
     */
    public get isLoaded(): boolean {
        return this._isLoaded;
    }
    /**
     * Gets the height of the texture.
     * @returns number
     */
    public get height(): number {
        return this._height;
    }
    /**
     * Gets the width of the texture.
     * @returns number
     */
    public get width(): number {
        return this._width;
    }
    /**
     * Class constructor.
     * @param  {string} name
     * @param  {number=1} width
     * @param  {number=1} height
     */
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
    /**
     * Activates and binds the texture to the GLBuffer.
     * @param  {number=0} textureUnit
     * @returns void
     */
    public activateAndBind(textureUnit: number = 0): void {
        GLUtility.gl.activeTexture(GLUtility.gl.TEXTURE0 + textureUnit);
        this.bind();
    }
    /**
     * Binds the texture to the GLBuffer.
     * @returns void
     */
    public bind(): void {
        GLUtility.gl.bindTexture(GLUtility.gl.TEXTURE_2D, this._handle);
    }
    /**
     * Destroys the texture.
     * @returns void
     */
    public destroy(): void {
        GLUtility.gl.deleteTexture(this._handle);
    }
    /**
     * Texture message handler.
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        if (message.code === AssetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + this._name) {
            this.loadTextureFromAsset(message.context as ImageAsset);
        }
    }
    /**
     * Unbinds the texture.
     * @returns void
     */
    public unbind(): void {
        GLUtility.gl.bindTexture(GLUtility.gl.TEXTURE_2D, null);
    }
    /**
     * Loads the texture from an image asset.
     * @param  {ImageAsset} asset
     * @returns void
     */
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
    /**
     * Gets if the texture's width and height is a power of two.
     * @returns boolean
     */
    private isPowerOf2(): boolean {
        return this.isValuePowreOf2(this._width) && this.isValuePowreOf2(this._height);
    }
    /**
     * Gets the value if it's a power of two.
     * @param  {number} value
     * @returns boolean
     */
    private isValuePowreOf2(value: number): boolean {
        return (value & (value - 1)) === 0;
    }
}