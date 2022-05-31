import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Vector3 } from "../math/vector3";
import { AnimatedSprite } from "../rendersystem/animatedsprite";
import { Shader } from "../rendersystem/shader";
import { Component } from "./component";
import { IComponentData } from "./icomponentdata";
import { SpriteComponentData } from "./spritecomponent";
import { IComponent } from "./icomponent";
import { IComponentBuilder } from "./icomponentbuilder";

export class AnimatedSpriteComponent extends Component {
    private _autoPlay: boolean;
    private _sprite: AnimatedSprite;
    /**
     * Gets the document
     * @returns AnimatedSprite
     */
    public get sprite(): AnimatedSprite {
        return this._sprite;
    }
    /**
     * Class Constructor
     * @param  {AnimatedSpriteComponentData} data
     */
    public constructor(data: AnimatedSpriteComponentData) {
        super(data);
        this._autoPlay = data.autoPlay;
        this._sprite = new AnimatedSprite(this.name, data.materialName, data.frameWidth, data.frameHeight, data.frameWidth,
            data.frameHeight, data.frameCount, data.frameSequence);
    }
    /**
     * Checks if the animation is playing.
     * @returns boolean
     */
    public isPlaying(): boolean {
        return this._sprite.isPlaying;
    }
    /**
     * Lodas the animated sprite.
     * @returns void
     */
    public load(): void {
        this._sprite.load();
    }
    /**
     * Plays the animated sprite.
     * @returns void
     */
    public play(): void {
        this._sprite.play();
    }
    /**
     * Draws the sprite to the screen.
     * @param  {Shader} shader
     * @returns void
     */
    public render(shader: Shader): void {
        this._sprite!.draw(shader, this._owner!.worldMatrix);
        super.render(shader);
    }
    /**
     * Sets the current frame to render.
     * @param  {number} frameNumber
     * @returns void
     */
    public setFrame(frameNumber: number): void {
        this._sprite.setFrame(frameNumber);
    }
    /**
     * Stops the animated sprite from playing.
     * @returns void
     */
    public stop(): void {
        this._sprite.stop();
    }
    /**
     * Updates the animated sprite running.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        this._sprite.update(delta);
        super.update(delta);
    }
    /**
     * Checks if the sprite is ready to play.
     * @returns void
     */
    public updateReady(): void {
        if (!this._autoPlay) {
            this._sprite.stop();
        }
    }
}

export class AnimatedSpriteComponentData extends SpriteComponentData implements IComponentData {
    public frameWidth!: number;
    public frameHeight!: number;
    public frameCount!: number;
    public frameSequence!: Array<number>;
    public autoPlay: boolean = true;
    /**
     * Class constructor
     * @param  {any} json
     */
    constructor(json: any) {
        super(json);
        this.setFromJson(json);
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
    public setFromJson(json: any): void {
        super.setFromJson(json);
        if (json.frameWidth === undefined) {
            log(LogLevel.error, `AnimatedSpriteComponent requires frameWidth to be defined.`,
                ErrorCode.NoFrameWidth);
        } else {
            this.frameWidth = Number(json.frameWidth);
        }
        if (json.frameHeight === undefined) {
            log(LogLevel.error, `AnimatedSpriteComponent requires frameHeight to be defined.`,
                ErrorCode.NoFrameHeight);
        } else {
            this.frameHeight = Number(json.frameHeight);
        }
        if (json.frameCount === undefined) {
            log(LogLevel.error, `AnimatedSpriteComponent requires frameCount to be defined.`,
                ErrorCode.NoFrameCount);
        } else {
            this.frameCount = Number(json.frameCount);
        }
        if (json.frameSequence === undefined) {
            log(LogLevel.error, `AnimatedSpriteComponent requires frameSequence to be defined.`,
                ErrorCode.NoFrameSequence);
        } else {
            this.frameSequence = json.frameSequence;
        }
        if (json.autoPlay !== undefined) {
            this.autoPlay = Boolean(json.autoPlay);
        }
    }
}

export class AnimatedSpriteComponentBuilder implements IComponentBuilder {
    /**
     * Gets the type of animated sprite.
     * @returns string
     */
    public get type(): string {
        return "animatedsprite";
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
    public buildFromJson(json: any): IComponent {
        let data: AnimatedSpriteComponentData = new AnimatedSpriteComponentData(json);
        return new AnimatedSpriteComponent(data);
    }
}
