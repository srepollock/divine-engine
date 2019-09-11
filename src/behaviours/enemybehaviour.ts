import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { IMessageHandler } from "../core/messagesystem/imessagehandler"; 
import { Message } from "../core/messagesystem/message";
import { MessageType } from "../core/messagesystem/messagetype";
import { AnimatedSpriteComponent } from "../components/animatedspritecomponent";
import { AnimatedSpriteComponentData } from "../components/animatedspritecomponentdata";
import { CollisionComponent } from "../components/collisioncomponent";
import { Vector2 } from "../math/vector2";
import { Vector3 } from "../math/vector3";
import { Behaviour } from "./behaviour";
import { EnemyBehaviourData } from "./enemybehaviourdata";
import { CollisionData } from "../physicssystem/collisiondata";
import { AudioManager } from "../soundsystem/audiomanager";

export class EnemyBehaviour extends Behaviour implements IMessageHandler {
    private _hitPoints: number = 1;
    private _startingHitPoints: number = this._hitPoints;
    private _lives: number = 1;
    private _acceleration: Vector2 = new Vector2(0, 0);
    private _velocity: Vector2 = new Vector2();
    private _isAlive: boolean = true;
    private _isJumping: boolean = false;
    private _enemyCollisionComponent: string;
    private _groundCollisionComponent: string;
    private _animatedSpriteName: string;
    private _attackSpriteName: string;
    private _hitSpriteName: string;
    private _dieSpriteName: string;
    private _walkSpriteName: string;
    private _idleSpriteName: string;
    private _jumpSpriteName: string;
    private _sprite: AnimatedSpriteComponent | undefined;
    private _maxVelocityX: number;
    private _maxVelocityY: number;
    private _start: Vector2;
    private _end: Vector2;
    private _direction: Vector2;
    private _jumping: boolean;
    /**
     * Class constructor
     * @param  {EnemyBehaviourData} data
     */
    constructor(data: EnemyBehaviourData) {
        super(data);
        this._acceleration = data.acceleration;
        this._groundCollisionComponent = data.groundCollisionComponent;
        this._enemyCollisionComponent = data.enemyCollisionComponent;
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
        }
        this._owner!.transform.position.add(new Vector3(this._velocity.x, this._velocity.y, 0));
        if ((this._owner!.transform.position.x > this._start.x &&
            this._end.x > this._owner!.transform.position.x)) {
            this._acceleration.x = -(this._acceleration.x);
            this._velocity.x = -(this._velocity.x);
            this._owner!.transform.rotation.y = (this._owner!.transform.rotation.y === 3.14159) ? 0 : 3.14159;
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
                if (data.a.name === this._groundCollisionComponent || data.b.name === this._groundCollisionComponent) {
                    this._isJumping = false;
                    this._velocity.y = 0;
                    this._acceleration.y = 0;
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
    private changeSprite(materialName: string, frameSequence: Array<number>): void {
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
    private die(): void {
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
    private onJump(): void {
        if (this._isAlive && !this._isJumping) {
            this._isJumping = true;
            this._velocity.y = -(this._maxVelocityY);
            this.changeSprite(this._jumpSpriteName, [0, 1, 2, 3, 3, 3, 3]);
        }
    }
}