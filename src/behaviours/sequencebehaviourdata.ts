import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { AnimatedSpriteComponent } from "../components";
import { Vector3 } from "../math";
import { IBehaviourData } from "./ibehaviourdata";
import { Action } from "./sequencebehaviour";

export class SequenceBehaviourData implements IBehaviourData {
    public name!: string;
    public animatedSpriteName!: string;
    public attackSpriteName!: string;
    public hitSpriteName!: string;
    public dieSpriteName!: string;
    public walkSpriteName!: string;
    public idleSpriteName!: string;
    public jumpSpriteName!: string;
    public sprite: AnimatedSpriteComponent | undefined;
    public maxVelocityX!: number;
    public maxVelocityY!: number;
    public actionIndex: number = 0;
    public actions: Array<Action> = new Array();
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
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
        if (json.actions === undefined) {
            log(LogLevel.error, `Actions have not been defined for the sequence behaviour.`, ErrorCode.NoActions);
        } else {
            json.actions.forEach((element: Action) => {
                let start = new Vector3();
                start.setFromJson(element.start);
                let end = new Vector3();
                end.setFromJson(element.end);
                let time = (element.time !== undefined) ? Number(element.time) : 0;
                let skip = (element.skip !== undefined) ? Boolean(element.skip) : false;
                this.actions.push({start, end, time, skip});
            });
        }
    }
}