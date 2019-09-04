import { Vector2 } from "../math/vector2";
import { IBehaviourData } from "./ibehaviourdata";

export class PlayerBehaviourData implements IBehaviourData {
    public name!: string;
    public acceleration: Vector2 = new Vector2(0, 920);
    public playerCollisionComponent!: string;
    public groundCollisionComponent!: string;
    public enemyCollisionComponent!: string;
    public animatedSpriteName!: string;
    public maxVelocityX: number = 2;
    public maxVelocityY: number = 5;
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            throw new Error(`Name must be defined in behaviour data.`);
        }
        this.name = String(json.name);
        if (json.acceleration !== undefined) {
            this.acceleration.setFromJson(json.acceleration);
        }
        if (json.playerCollisionComponent === undefined) {
            throw new Error(`playerCollisionComponent must be defined for player collision.`);
        } else {
            this.playerCollisionComponent = json.playerCollisionComponent;
        }
        if (json.groundCollisionComponent === undefined) {
            throw new Error(`groundCollisionComponent must be defined for player collision.`);
        } else {
            this.groundCollisionComponent = json.groundCollisionComponent;
        }
        if (json.enemyCollisionComponent === undefined) {
            throw new Error(`enemyCollisionComponent must be defined for player collision.`);
        } else {
            this.enemyCollisionComponent = json.enemyCollisionComponent;
        }
        if (json.animatedSpriteName === undefined) {
            throw new Error(`animatedSpriteName must be defined for player collision.`);
        } else {
            this.animatedSpriteName = String(json.animatedSpriteName);
        }
        if (json.maxVelocityX !== undefined) {
            this.maxVelocityX = Number(json.maxVelocityX);
        }
        if (json.maxVelocityY !== undefined) {
            this.maxVelocityY = Number(json.maxVelocityY);
        }
    }
}