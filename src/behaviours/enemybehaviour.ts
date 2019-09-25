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

export class EnemyBehaviour extends Behaviour implements IMessageHandler {
    protected _hitPoints: number = 1;
    protected _startingHitPoints: number = this._hitPoints;
    protected _lives: number = 1;
    protected _acceleration: Vector2 = new Vector2(0, 0);
    protected _velocity: Vector2 = new Vector2();
    protected _isAlive: boolean = true;
    protected _isJumping: boolean = false;
    protected _enemyCollisionComponent: string;
    protected _groundCollisionComponent: string;
    protected _playerCollisionComponent: string;
    protected _animatedSpriteName: string;
    protected _attackSpriteName: string;
    protected _hitSpriteName: string;
    protected _dieSpriteName: string;
    protected _walkSpriteName: string;
    protected _idleSpriteName: string;
    protected _jumpSpriteName: string;
    protected _sprite: AnimatedSpriteComponent | undefined;
    protected _maxVelocityX: number;
    protected _maxVelocityY: number;
    protected _start: Vector2;
    protected _end: Vector2;
    protected _direction: Vector2;
    protected _jumping: boolean;
    protected _rotate: boolean = true;
    /**
     * Class constructor
     * @param  {EnemyBehaviourData} data
     */
    constructor(data: EnemyBehaviourData) {
        super(data);
        this._acceleration = data.acceleration;
        this._groundCollisionComponent = data.groundCollisionComponent;
        this._enemyCollisionComponent = data.enemyCollisionComponent;
        this._playerCollisionComponent = data.playerCollisionComponent;
        this._animatedSpriteName = data.animatedSpriteName;
        this._attackSpriteName = data.attackSpriteName;
        this._hitSpriteName = data.hitSpriteName;
        this._dieSpriteName = data.dieSpriteName;
        this._walkSpriteName = data.walkSpriteName;
        this._idleSpriteName = data.idleSpriteName;
        this._jumpSpriteName = data.jumpSpriteName;
        this._maxVelocityX = data.maxVelocityX;
        this._maxVelocityY = data.maxVelocityY;
        this._start = data.start;
        this._end = data.end;
        this._direction = data.direction;
        this._acceleration = this._direction;
        this._jumping = data.jumping;
        this._rotate = data.rotate;

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
        if (this._isJumping) {
            this._acceleration.y += (9.75);
        } else if (this._jumping) {
            this.onJump();
        }
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
        if (!(this._owner!.transform.position.x > this._start.x &&
            this._end.x > this._owner!.transform.position.x)) {
            this._acceleration.x = -(this._acceleration.x);
            this._velocity.x = -(this._velocity.x);
            if (this._rotate) {
                this._owner!.transform.rotation.y = (this._owner!.transform.rotation.y === 3.14159) ? 0 : 3.14159;
            }
        }
        if (!(this._owner!.transform.position.y > this._start.y &&
            this._end.y > this._owner!.transform.position.y)) {
            this._acceleration.y = -(this._acceleration.y);
            this._velocity.y = -(this._velocity.y);
        }
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
                if (data.a.name.includes(this._groundCollisionComponent) && 
                    data.b.name === this._enemyCollisionComponent || 
                    data.b.name === this._enemyCollisionComponent && 
                    data.a.name.includes(this._groundCollisionComponent)) {
                    this._isJumping = false;
                    this._velocity.y = 0;
                    this._acceleration.y = 0;
                }
                if ((data.a.name === this._playerCollisionComponent && 
                    data.b.name === this._enemyCollisionComponent) || 
                    (data.b.name === this._playerCollisionComponent && 
                    data.a.name === this._enemyCollisionComponent)) {
                    if (data.a.owner!.name === this._owner!.name ||
                        data.b.owner!.name === this._owner!.name) {
                        this.takeDamage();
                    }
                }
                break;
            case MessageType.ANIMATION_COMPLETE:
                switch (message.context) {
                    case this._dieSpriteName:
                        this._sprite!.sprite.setFrameOnce(this._sprite!.sprite.frameCount - 2);
                        this._sprite!.stop();
                        Message.unsubscribe(MessageType.ANIMATION_COMPLETE, this);
                        break;
                    case this._attackSpriteName:
                    case this._jumpSpriteName:
                        this.changeSprite(this._walkSpriteName, [0, 1, 2, 3, 4, 5, 6, 7]);
                        Message.unsubscribe(MessageType.ANIMATION_COMPLETE, this);
                        break;
                }
        }
    }
    /**
     * Has the owner of the behaviour take damage.
     * @returns void
     */
    public takeDamage(): void {
        AudioManager.playSound("enemyhit");
        this._owner!.transform.position.add(new Vector3(-3, 0, 0));
        this.changeSprite(this._hitSpriteName, [0, 1, 0, 1]);
        if (--this._hitPoints <= 0) {
            this.die();
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
        this.changeSprite(this._dieSpriteName, [0, 1, 2, 3, 4]);
        this._acceleration = new Vector2();
        this._velocity = new Vector2();
        (this._owner!.getComponentByName(this._enemyCollisionComponent) as CollisionComponent).isStatic = true;
    }
    /**
     * Causes the owner to perform a jump.
     * @returns void
     */
    protected onJump(): void {
        if (this._isAlive && !this._isJumping) {
            this._isJumping = true;
            this._velocity.y = -(this._maxVelocityY);
            this.changeSprite(this._jumpSpriteName, [0, 1, 2, 3, 3, 3, 3]);
        }
    }
}

export class EnemyBehaviourData implements IBehaviourData {
    public name!: string;
    public acceleration: Vector2 = new Vector2(0, 0);
    public enemyCollisionComponent!: string;
    public groundCollisionComponent!: string;
    public playerCollisionComponent!: string;
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
    public rotate: boolean = true;
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
        if (json.playerCollisionComponent === undefined) {
            log(LogLevel.error, `playerCollisionComponent must be defined for enemy controller.`, 
                ErrorCode.NoPlayerCollisionComponentName);
        } else {
            this.playerCollisionComponent = json.playerCollisionComponent;
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
        if (json.rotate !== undefined) {
            this.rotate = Boolean(json.rotate);
        }
    }
}

export class EnemyBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "enemy";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new EnemyBehaviourData();
        data.setFromJson(json);
        return new EnemyBehaviour(data);
    }
}