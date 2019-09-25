import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { AnimatedSpriteComponent, AnimatedSpriteComponentData } from "../components/animatedspritecomponent";
import { CollisionComponent } from "../components/collisioncomponent";
import { IMessageHandler } from "../core/messagesystem/imessagehandler"; 
import { Message } from "../core/messagesystem/message";
import { MessageType } from "../core/messagesystem/messagetype";
import { Vector2 } from "../math/vector2";
import { Vector3 } from "../math/vector3";
import { CollisionData } from "../physicssystem/collisiondata";
import { AudioManager } from "../soundsystem/audiomanager";
import { Behaviour } from "./behaviour";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { IBehaviourData } from "./ibehaviourdata";

export class ProjectileBehaviour extends Behaviour implements IMessageHandler {
    protected _acceleration: Vector2 = new Vector2(0, 0);
    protected _velocity: Vector2 = new Vector2();
    protected _isAlive: boolean = true;
    protected _projectileCollisionComponent: string;
    protected _playerCollisionComponent: string;
    protected _animatedSpriteName: string;
    protected _hitSpriteName: string;
    protected _sprite: AnimatedSpriteComponent | undefined;
    protected _maxVelocityX: number;
    protected _maxVelocityY: number;
    protected _start: Vector2;
    protected _end: Vector2;
    protected _direction: Vector2;
    /**
     * Class constructor
     * @param  {BossBehaviourData} data
     */
    constructor(data: ProjectileBehaviourData) {
        super(data);
        this._acceleration = data.acceleration;
        this._projectileCollisionComponent = data.projectileCollisionComponent;
        this._playerCollisionComponent = data.playerCollisionComponent;
        this._animatedSpriteName = data.animatedSpriteName;
        this._hitSpriteName = data.hitSpriteName;
        this._maxVelocityX = data.maxVelocityX;
        this._maxVelocityY = data.maxVelocityY;
        this._start = data.start;
        this._end = data.end;
        this._direction = data.direction;
        this._acceleration = this._direction;
        Message.subscribe(MessageType.COLLISION_ENTRY, this);
    }
    /**
     * Checks if the behaviour is ready to update.
     * @returns void
     */
    public updateReady(): void {
        super.updateReady();
        this._sprite = this._owner!.getComponentByName(this._animatedSpriteName) as AnimatedSpriteComponent;
        if (this._sprite === undefined) {
            log(LogLevel.error, 
                `AnimatedSprite named: ${this._animatedSpriteName} is not attached to the component owner.`,
                ErrorCode.SpriteNotAttached);
        }
    }
    /**
     * Updates the behaviour.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void { 
        if (!this._isAlive) {
            return;
        }
        this._owner!.transform.rotation.y = (this._direction.x > 0) ? 0 : 3.14159;
        this._velocity.add(this._acceleration.clone().scale(delta));
        if (this._velocity.x > this._maxVelocityX) {
            this._velocity.x = this._maxVelocityX;
        } else if (this._velocity.x < -this._maxVelocityX) {
            this._velocity.x = -this._maxVelocityX;
        } else if (this._velocity.y < -this._maxVelocityY) {
            this._velocity.y = -this._maxVelocityY;
        } else if (this._velocity.y > this._maxVelocityY) {
            this._velocity.y = this._maxVelocityY;
        }
        this._owner!.transform.position.add(new Vector3(this._velocity.x, this._velocity.y, 0));
        super.update(delta); 
    }
    /**
     * Called when the behaviour handles a message.
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        switch (message.code) {
            case MessageType.COLLISION_ENTRY:
                let data: CollisionData = (message.context as CollisionData);
                if ((data.a.name === this._playerCollisionComponent && 
                    data.b.name === this._projectileCollisionComponent) || 
                    (data.b.name === this._playerCollisionComponent && 
                    data.a.name === this._projectileCollisionComponent)) {
                    this.die();
                }
                if ((data.a.name.includes("boundary") && data.b.name === this._playerCollisionComponent) ||
                    ((data.b.name.includes("boundary") && data.a.name === this._playerCollisionComponent))) {
                    this.die();
                }
                break;
        }
    }
    /**
     * Changes the sprtie of the owner based on the material and frameSequence.
     * *NOTE*: This can only change to animated sprite materials.
     * @param  {string} materialName
     * @param  {Array<number>} frameSequence
     * @returns void
     */
    protected changeSprite(materialName: string, frameSequence: Array<number>): void {
        this._sprite = this._owner!.getComponentByName(this._animatedSpriteName) as AnimatedSpriteComponent;
        if (this._sprite!.sprite.materialName !== materialName) {
            let frameWidth = (
                this._owner!.getComponentByName(this._animatedSpriteName) as AnimatedSpriteComponent)!.sprite.width;
            let frameHeight = (
                this._owner!.getComponentByName(this._animatedSpriteName) as AnimatedSpriteComponent)!.sprite.height;
            let newSpriteComponent = new AnimatedSpriteComponent(
                new AnimatedSpriteComponentData(JSON.parse(JSON.stringify({
                    name: this._animatedSpriteName,
                    type: "animatedsprite",
                    materialName: materialName,
                    frameHeight: frameHeight,
                    frameWidth: frameWidth,
                    frameCount: frameSequence.length,
                    frameSequence: frameSequence
                })))
            );
            this._owner!.removeComponent(this._sprite!.name);
            this._owner!.addComponent(newSpriteComponent);
            this._sprite = this._owner!.getComponentByName(this._animatedSpriteName) as AnimatedSpriteComponent;
            this._sprite.load();
            Message.subscribe(MessageType.ANIMATION_COMPLETE, this);
        }
    }
    /**
     * Kills the owner object.
     * @returns void
     */
    protected die(): void {
        this._isAlive = false;
        this.changeSprite(this._hitSpriteName, [0, 1]);
        AudioManager.playSound("fire");
        (this._owner!.getComponentByName(this._projectileCollisionComponent) as CollisionComponent).isStatic = true;
        setTimeout(() => {
            this._owner!.isVisible = false;
        }, 500);
    }
}

export class ProjectileBehaviourData implements IBehaviourData {
    public name!: string;
    public acceleration: Vector2 = new Vector2(0, 0);
    public playerCollisionComponent!: string;
    public projectileCollisionComponent!: string;
    public animatedSpriteName!: string;
    public projectileSprite!: string;
    public hitSpriteName!: string;
    public maxVelocityX: number = 5;
    public maxVelocityY: number = 15;
    public start: Vector2 = new Vector2();
    public end: Vector2 = new Vector2();
    public direction: Vector2 = new Vector2();
    /**
     * Sets this classes data from a JSON object.
     * @param  {any} json
     * @returns void
     */
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
        if (json.acceleration !== undefined) {
            this.acceleration.setFromJson(json.acceleration);
        }
        if (json.playerCollisionComponent === undefined) {
            log(LogLevel.error, `playerCollisionComponent must be defined for projectile behaviour.`, 
                ErrorCode.NoName);
        } else {
            this.playerCollisionComponent = String(json.playerCollisionComponent);
        }
        if (json.projectileCollisionComponent === undefined) {
            log(LogLevel.error, `projectileCollisionComponent must be defined for projectile behaviour.`, 
                ErrorCode.NoName);
        } else {
            this.projectileCollisionComponent = String(json.projectileCollisionComponent);
        }
        if (json.animatedSpriteName === undefined) {
            log(LogLevel.error, `animatedSpriteName must be defined for projectile behaviour.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.animatedSpriteName = String(json.animatedSpriteName);
        }
        if (json.hitSpriteName === undefined) {
            log(LogLevel.error, `hitSpriteName must be defined for projectile behaviour.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.hitSpriteName = String(json.hitSpriteName);
        }
        if (json.projectileSprite === undefined) {
            log(LogLevel.error, `projectileSprite must be defined for projectile behaviour.`, 
                ErrorCode.NoAnimatedSpriteName);
        } else {
            this.projectileSprite = String(json.projectileSprite);
        }
        if (json.maxVelocityX !== undefined) {
            this.maxVelocityX = Number(json.maxVelocityX);
        }
        if (json.maxVelocityY !== undefined) {
            this.maxVelocityY = Number(json.maxVelocityY);
        }
        if (json.direction === undefined) {
            log(LogLevel.error, `direction must be defined for projectile behaviour`, ErrorCode.NoName);
        } else {
            this.direction.setFromJson(json.direction);
        }
    }
}

export class ProjectileBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "projectile";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new ProjectileBehaviourData();
        data.setFromJson(json);
        return new ProjectileBehaviour(data);
    }
}