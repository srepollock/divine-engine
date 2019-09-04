import { Vector3 } from "../math/vector3";
import { IComponentData } from "./icomponentdata";
import { SpriteComponentData } from "./spritecomponentdata";

export class AnimatedSpriteComponentData extends SpriteComponentData implements IComponentData {
    public frameWidth!: number;
    public frameHeight!: number;
    public frameCount!: number;
    public frameSequence!: Array<number>;
    public autoPlay: boolean = true;
    public origin: Vector3 = new Vector3();
    public setFromJson(json: any): void {
        super.setFromJson(json);
        if (json.frameWidth === undefined) {
            throw new Error(`AnimatedSpriteComponent requires frameWidth to be defined.`);
        } else {
            this.frameWidth = Number(json.frameWidth);
        }
        if (json.frameHeight === undefined) {
            throw new Error(`AnimatedSpriteComponent requires frameHeight to be defined.`);
        } else {
            this.frameHeight = Number(json.frameHeight);
        }
        if (json.frameCount === undefined) {
            throw new Error(`AnimatedSpriteComponent requires frameCount to be defined.`);
        } else {
            this.frameCount = Number(json.frameCount);
        }
        if (json.frameSequence === undefined) {
            throw new Error(`AnimatedSpriteComponent requires frameSequence to be defined.`);
        } else {
            this.frameSequence = json.frameSequence;
        }
        if (json.autoPlay !== undefined) {
            this.autoPlay = Boolean(json.autoPlay);
        }
        if (json.origin !== undefined) {
            this.origin.setFromJson(json.origin);
        }
    }
}