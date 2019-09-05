import { Vector3 } from "../math/vector3";
import { AnimatedSprite } from "../rendersystem/animatedsprite";
import { Shader } from "../rendersystem/shader";
import { AnimatedSpriteComponentData } from "./animatedspritecomponentdata";
import { Component } from "./component";

export class AnimatedSpriteComponent extends Component {
    private _autoPlay: boolean;
    private _sprite: AnimatedSprite;
    public get sprite(): AnimatedSprite {
        return this._sprite;
    }
    public constructor(data: AnimatedSpriteComponentData) {
        super(data);
        this._autoPlay = data.autoPlay;
        this._sprite = new AnimatedSprite(name, data.materialName, data.frameWidth, data.frameHeight, data.frameWidth, 
            data.frameHeight, data.frameCount, data.frameSequence);
    }
    public isPlaying(): boolean {
        return this._sprite.isPlaying;
    }
    public load(): void {
        this._sprite.load();
    }
    public play(): void {
        this._sprite.play();
    }
    public render(shader: Shader): void {
        this._sprite!.draw(shader, this._owner!.worldMatrix);
        super.render(shader);
    }
    public setFrame(frameNumber: number): void {
        this._sprite.setFrame(frameNumber);
    }
    public stop(): void {
        this._sprite.stop();
    }
    public update(delta: number): void {
        this._sprite.update(delta);
        super.update(delta);
    }
    public updateReady(): void {
        if (!this._autoPlay) {
            this._sprite.stop();
        }
    }
}