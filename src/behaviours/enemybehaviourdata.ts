import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Vector2 } from "../math/vector2";
import { IBehaviourData } from "./ibehaviourdata";

export class EnemyBehaviourData implements IBehaviourData {
    public name!: string;
    public acceleration: Vector2 = new Vector2(0, 0);
    public enemyCollisionComponent!: string;
    public groundCollisionComponent!: string;
    public animatedSpriteName!: string;
    public attackSpriteName!: string;
    public hitSpriteName!: string;
    public dieSpriteName!: string;
    public walkSpriteName!: string;
    public idleSpriteName!: string;
    public jumpSpriteName!: string;
    public maxVelocityX: number = 2;
    public maxVelocityY: number = 15;
    public start: Vector2 = new Vector2();
    public end: Vector2 = new Vector2();
    public direction: Vector2 = new Vector2();
    public jumping: boolean = false;
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
        if (json.acceleration !== undefined) {
            this.acceleration.setFromJson(json.acceleration);
        }
        if (json.groundCollisionComponent === undefined) {
            log(LogLevel.error, `groundCollisionComponent must be defined for enemy controller.`, 
                ErrorCode.NoGroundCollisionComponentName);
        } else {
            this.groundCollisionComponent = json.groundCollisionComponent;
        }
        if (json.enemyCollisionComponent === undefined) {
            log(LogLevel.error, `enemyCollisionComponent must be defined for enemy controller.`, 
                ErrorCode.NoEnemyCollisionComponentName);
        } else {
            this.enemyCollisionComponent = json.enemyCollisionComponent;
        }
        if (json.animatedSpriteName === undefined) {
            log(LogLevel.error, `animatedSpriteName must be defined for enemy controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.animatedSpriteName = String(json.animatedSpriteName);
        }
        if (json.attackSpriteName === undefined) {
            log(LogLevel.error, `attackSpriteName must be defined for enemy controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.attackSpriteName = String(json.attackSpriteName);
        }
        if (json.dieSpriteName === undefined) {
            log(LogLevel.error, `dieSpriteName must be defined for enemy controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.dieSpriteName = String(json.dieSpriteName);
        }
        if (json.hitSpriteName === undefined) {
            log(LogLevel.error, `hitSpriteName must be defined for enemy controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.hitSpriteName = String(json.hitSpriteName);
        }
        if (json.walkSpriteName === undefined) {
            log(LogLevel.error, `walkSpriteName must be defined for enemy controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.walkSpriteName = String(json.walkSpriteName);
        }
        if (json.idleSpriteName === undefined) {
            log(LogLevel.error, `idleSpriteName must be defined for enemy controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.idleSpriteName = String(json.idleSpriteName);
        }
        if (json.jumpSpriteName === undefined) {
            log(LogLevel.error, `jumpSpriteName must be defined for enemy controller.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.jumpSpriteName = String(json.jumpSpriteName);
        }
        if (json.start === undefined) {
            log(LogLevel.error, `jumpSpriteName must be defined for enemy controller.`, 
                ErrorCode.NoStartPosition);
        } else {
            this.start.setFromJson(json.start);
        }
        if (json.end === undefined) {
            log(LogLevel.error, `jumpSpriteName must be defined for enemy controller.`, 
                ErrorCode.NoEndPosition);
        } else {
            this.end.setFromJson(json.end);
        }
        if (json.direction === undefined) {
            log(LogLevel.error, `jumpSpriteName must be defined for enemy controller.`, 
                ErrorCode.NoDirection);
        } else {
            this.direction.setFromJson(json.direction);
        }
        if (json.maxVelocityX !== undefined) {
            this.maxVelocityX = Number(json.maxVelocityX);
        }
        if (json.maxVelocityY !== undefined) {
            this.maxVelocityY = Number(json.maxVelocityY);
        }
        if (json.jumping !== undefined) {
            this.jumping = Boolean(json.jumping);
        }
    }
}