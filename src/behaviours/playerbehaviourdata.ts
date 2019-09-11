import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Vector2 } from "../math/vector2";
import { IBehaviourData } from "./ibehaviourdata";

export class PlayerBehaviourData implements IBehaviourData {
    public name!: string;
    public acceleration: Vector2 = new Vector2(0, 0);
    public playerCollisionComponent!: string;
    public groundCollisionComponent!: string;
    public enemyCollisionComponent!: string;
    public flagCollisionComponent!: string;
    public animatedSpriteName!: string;
    public attackSpriteName!: string;
    public hitSpriteName!: string;
    public dieSpriteName!: string;
    public walkSpriteName!: string;
    public idleSpriteName!: string;
    public jumpSpriteName!: string;
    public maxVelocityX: number = 5;
    public maxVelocityY: number = 15;
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
        if (json.acceleration !== undefined) {
            this.acceleration.setFromJson(json.acceleration);
        }
        if (json.playerCollisionComponent === undefined) {
            log(LogLevel.error, `playerCollisionComponent must be defined for player controller.`, 
                ErrorCode.NoPlayerCollisionComponentName);
        } else {
            this.playerCollisionComponent = json.playerCollisionComponent;
        }
        if (json.groundCollisionComponent === undefined) {
            log(LogLevel.error, `groundCollisionComponent must be defined for player controller.`, 
                ErrorCode.NoGroundCollisionComponentName);
        } else {
            this.groundCollisionComponent = json.groundCollisionComponent;
        }
        if (json.enemyCollisionComponent === undefined) {
            log(LogLevel.error, `enemyCollisionComponent must be defined for player controller.`, 
                ErrorCode.NoEnemyCollisionComponentName);
        } else {
            this.enemyCollisionComponent = json.enemyCollisionComponent;
        }
        if (json.flagCollisionComponent === undefined) {
            log(LogLevel.error, 
                `flagCollisionComponent must be defined for player controller. This is for scene exiting.`, 
                ErrorCode.NoFlagCollisionComponentName);
        } else {
            this.flagCollisionComponent = json.flagCollisionComponent;
        }
        if (json.animatedSpriteName === undefined) {
            log(LogLevel.error, `animatedSpriteName must be defined for player controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.animatedSpriteName = String(json.animatedSpriteName);
        }
        if (json.attackSpriteName === undefined) {
            log(LogLevel.error, `attackSpriteName must be defined for player controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.attackSpriteName = String(json.attackSpriteName);
        }
        if (json.dieSpriteName === undefined) {
            log(LogLevel.error, `dieSpriteName must be defined for player controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.dieSpriteName = String(json.dieSpriteName);
        }
        if (json.hitSpriteName === undefined) {
            log(LogLevel.error, `hitSpriteName must be defined for player controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.hitSpriteName = String(json.hitSpriteName);
        }
        if (json.walkSpriteName === undefined) {
            log(LogLevel.error, `walkSpriteName must be defined for player controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.walkSpriteName = String(json.walkSpriteName);
        }
        if (json.idleSpriteName === undefined) {
            log(LogLevel.error, `idleSpriteName must be defined for player controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.idleSpriteName = String(json.idleSpriteName);
        }
        if (json.jumpSpriteName === undefined) {
            log(LogLevel.error, `jumpSpriteName must be defined for player controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.jumpSpriteName = String(json.jumpSpriteName);
        }
        if (json.maxVelocityX !== undefined) {
            this.maxVelocityX = Number(json.maxVelocityX);
        }
        if (json.maxVelocityY !== undefined) {
            this.maxVelocityY = Number(json.maxVelocityY);
        }
    }
}