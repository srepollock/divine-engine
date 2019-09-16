import { Vector3 } from "../math/vector3";
import { AnimatedSprite } from "../rendersystem/animatedsprite";
import { Shader } from "../rendersystem/shader";
import { AnimatedSpriteComponentData } from "./animatedspritecomponentdata";
import { Component } from "./component";

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
        this._sprite = new AnimatedSprite(name, data.materialName, data.frameWidth, data.frameHeight, data.frameWidth, 
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