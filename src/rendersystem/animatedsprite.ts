import { log, LogLevel } from "de-loggingsystem";
import { AssetManager } from "../assets/assetmanager";
import { ImageAsset } from "../assets/imageasset";
import { IMessageHandler } from "../core/messagesystem/imessagehandler";
import { Message } from "../core/messagesystem/message";
import { MessageType } from "../core/messagesystem/messagetype";
import { Vector2 } from "../math/vector2";
import { MaterialManager } from "./materialmanager";
import { Sprite } from "./sprite";
import { UVInfo } from "./uvinfo";

export class AnimatedSprite extends Sprite implements IMessageHandler {
    private _assetWidth: number = 2;
    private _assetHeight: number = 2;
    private _frameHeight: number;
    private _frameWidth: number;
    private _frameCount: number;
    private _frameSequence: Array<number>;
    private _frameTime: number = 10;
    private _frameUV: Array<UVInfo> = new Array();
    private _currentFrame: number = 0;
    private _currentTime: number = 0;
    private _assetLoaded: boolean = false;
    private _isPlaying: boolean = true;
    /**
     * Gets the current frame count.
     * @returns number
     */
    public get frameCount(): number {
        return this._frameCount;
    }
    /**
     * Gets if the sprite is playing or not.
     * @returns boolean
     */
    public get isPlaying(): boolean {
        return this._isPlaying;
    }
    /**
     * Gets the material name.
     * @returns string
     */
    public get materialName(): string {
        return this._materialName!;
    }
    /**
     * Class constructor.
     * @param  {string} name
     * @param  {string} materialName
     * @param  {number=100} width
     * @param  {number=100} height
     * @param  {number=10} frameWidth
     * @param  {number=10} frameHeight
     * @param  {number=1} frameCount
     * @param  {Array<number>=newArray(} frameSequence
     */
    constructor(name: string, materialName: string, width: number = 100, height: number = 100, frameWidth: number = 10, 
        frameHeight: number = 10, frameCount: number = 1, frameSequence: Array<number> = new Array()) {
        super(name, materialName, width, height);
        this._frameWidth = frameWidth;
        this._frameHeight = frameHeight;
        this._frameCount = frameCount;
        this._frameSequence = frameSequence;
        Message.subscribe(AssetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + this._materialName, this);
    }
    /**
     * Destroys the animated sprite.
     * @returns void
     */
    public destroy(): void {
        super.destroy();
    }
    /**
     * Loads the animated sprite.
     * @returns void
     */
    public load(): void {
        super.load();
        if (this._assetLoaded) {
            this.setupFromMaterial();
        }
    }
    /**
     * Handles messages sent to the animated sprite.
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        if (message.code.indexOf(AssetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED) !== undefined) {
            this._assetLoaded = true;
            let asset = message.context as ImageAsset;
            this._assetWidth = asset.width;
            this._assetHeight = asset.height;
            this.calculateUV();
        }
    }
    /**
     * Plays the animated sprite component.
     * @returns void
     */
    public play(): void {
        this._isPlaying = true;
    }
    /**
     * Sets the frame number to play the animation at.
     * @param  {number} frameNumber
     * @returns void
     */
    public setFrame(frameNumber: number): void {
        if (frameNumber >= this._frameCount) {
            log(LogLevel.warning, `Frame ${frameNumber} is out of range. FrameCount: ${this._frameCount}`);
            frameNumber = 0;
        }
        this._currentFrame = frameNumber;
    }
    /**
     * Sets the frame number to play the animation at one time.
     * @param  {number} frameNumber
     * @returns void
     */
    public setFrameOnce(frameNumber: number): void {
        if (frameNumber >= this._frameCount) {
            log(LogLevel.warning, `Frame ${frameNumber} is out of range. FrameCount: ${this._frameCount}`);
            frameNumber = 0;
        }
        this._isPlaying = true;
        this._currentFrame = frameNumber;
        this._currentTime = Number.MAX_VALUE;
        this.update(0);
        this._isPlaying = false;
    }
    /**
     * Stops running the sprite.
     * @returns void
     */
    public stop(): void {
        this._isPlaying = false;
    }
    /**
     * Updates the animated sprite.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        if ( !this._assetLoaded ) {
            if ( !this._assetLoaded ) {
                this.setupFromMaterial();
            }
            return;
        }
        if ( !this._isPlaying ) {
            return;
        }
        if (this._currentTime++ >= this._frameTime) {
            this._currentFrame++;
            this._currentTime = 0;
            if (this._currentFrame >= this._frameSequence.length) {
                this._currentFrame = 0;
                Message.send(MessageType.ANIMATION_COMPLETE, this, this._materialName);
            }
            this.updateVerticies();
        }
        super.update(delta);
    }
    /**
     * Updates the sprite's vertex coordinates.
     * @returns void
     */
    public updateVerticies(): void {
        let frameUVIndex: number = this._frameSequence[this._currentFrame];
        this._vertices[0].texCoords.copy(this._frameUV[frameUVIndex].min);
        this._vertices[1].texCoords = new Vector2(this._frameUV[frameUVIndex].min.x, this._frameUV[frameUVIndex].max.y);
        this._vertices[2].texCoords.copy(this._frameUV[frameUVIndex].max);
        this._vertices[3].texCoords.copy(this._frameUV[frameUVIndex].max);
        this._vertices[4].texCoords = new Vector2(this._frameUV[frameUVIndex].max.x, this._frameUV[frameUVIndex].min.y);
        this._vertices[5].texCoords.copy(this._frameUV[frameUVIndex].min);
        this._buffer!.clear();
        this._vertices.forEach((v) => {
            this._buffer!.push(v.toArray());
        });
        this._buffer!.unbind();
    }
    /**
     * Calculates the (u,v) textuer coordinates.
     * @returns void
     */
    private calculateUV(): void {
        let totalWidth: number = 0;
        let yValue: number = 0;
        for (let i = 0; i < this._frameCount; i++) {
            totalWidth = i * this._frameWidth;
            if (totalWidth > this._assetWidth) {
                yValue++;
                totalWidth = 0;
            }
            let u = (i * this._frameWidth) / this._assetWidth;
            let v = (yValue * this._frameHeight) / this._assetHeight;
            let min: Vector2 = new Vector2(u, v);
            u = ((i * this._frameWidth) + this._frameWidth) / this._assetWidth;
            v = ((yValue * this._frameHeight) + this._frameHeight) / this._assetHeight;
            let max: Vector2 = new Vector2(u, v);
            this._frameUV.push(new UVInfo(min, max));
        }
    }
    /**
     * Sets up the material from loaded assets.
     * @returns void
     */
    private setupFromMaterial(): void {
        if ( !this._assetLoaded ) {
            let material = MaterialManager.getMaterial(this._materialName!);
            if ( material!.diffuseTexture!.isLoaded ) {
                if ( AssetManager.isAssetLoaded( material!.diffuseTextureName ) ) {
                    this._assetHeight = material!.diffuseTexture!.height;
                    this._assetWidth = material!.diffuseTexture!.width;
                    this._assetLoaded = true;
                    this.calculateUV();
                    this.updateVerticies();
                }
            }
        }
    }
}