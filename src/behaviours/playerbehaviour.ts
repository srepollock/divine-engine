import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { CollisionComponent } from "../components";
import { AnimatedSpriteComponent } from "../components/animatedspritecomponent";
import { AnimatedSpriteComponentData } from "../components/animatedspritecomponentdata";
import { IMessageHandler } from "../core/messagesystem/imessagehandler"; 
import { Message } from "../core/messagesystem/message";
import { MessageType } from "../core/messagesystem/messagetype";
import { Keys } from "../inputsystem/keys";
import { Vector2 } from "../math/vector2";
import { Vector3 } from "../math/vector3";
import { CollisionData } from "../physicssystem/collisiondata";
import { AudioManager } from "../soundsystem/audiomanager";
import { ZoneManager } from "../zones/zonemanager";
import { Behaviour } from "./behaviour";
import { EnemyBehaviour } from "./enemybehaviour";
import { PlayerBehaviourData } from "./playerbehaviourdata";
import { BossBehaviour } from "./bosscontrollerbehavoiur";

export class PlayerBehaviour extends Behaviour implements IMessageHandler {
    private _hitPoints: number = 3;
    private _startingHitPoints: number = this._hitPoints;
    private _lives: number = 3;
    private _acceleration: Vector2 = new Vector2(0, 0);
    private _velocity: Vector2 = new Vector2();
    private _isAlive: boolean = true;
    private _isJumping: boolean = false;
    private _isAttacking: boolean = false;
    private _isBouncingLeft: boolean = false;
    private _isBouncingRight: boolean = false;
    private _isBouncingUp: boolean = false;
    private _playerCollisionComponent: string;
    private _groundCollisionComponent: string;
    private _enemyCollisionComponent: string;
    private _flagCollisionComponent: string;
    private _deathCollisionComponent: string = "";
    private _animatedSpriteName: string;
    private _attackSpriteName: string;
    private _hitSpriteName: string;
    private _dieSpriteName: string;
    private _walkSpriteName: string;
    private _idleSpriteName: string;
    private _jumpSpriteName: string;
    private _sprite: AnimatedSpriteComponent | undefined;
    private _bounceFactor: number = 0.8;
    private _maxVelocityX: number;
    private _maxVelocityY: number;
    /**
     * Class constructor.
     * @param  {PlayerBehaviourData} data
     */
    constructor(data: PlayerBehaviourData) {
        super(data);
        this._acceleration = data.acceleration;
        this._playerCollisionComponent = data.playerCollisionComponent;
        this._groundCollisionComponent = data.groundCollisionComponent;
        this._enemyCollisionComponent = data.enemyCollisionComponent;
        this._flagCollisionComponent = data.flagCollisionComponent;
        this._deathCollisionComponent = data.deathCollisionComponent;
        this._animatedSpriteName = data.animatedSpriteName;
        this._attackSpriteName = data.attackSpriteName;
        this._hitSpriteName = data.hitSpriteName;
        this._dieSpriteName = data.dieSpriteName;
        this._walkSpriteName = data.walkSpriteName;
        this._idleSpriteName = data.idleSpriteName;
        this._jumpSpriteName = data.jumpSpriteName;
        this._maxVelocityX = data.maxVelocityX;
        this._maxVelocityY = data.maxVelocityY;
        Message.subscribe(MessageType.KEY_DOWN, this);
        Message.subscribe(MessageType.KEY_UP, this);
        Message.subscribe(MessageType.COLLISION_ENTRY, this);
        Message.subscribe(MessageType.COLLISION_UPDATE, this);
        Message.subscribe(MessageType.COLLISION_EXIT, this);
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
     * Updates the owner's position based on velocity (based on acceleration and the delta).
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        if (!this._isAlive) {
            return;
        }
        if (this._isJumping) {
            this._acceleration.y += (9.75);
        } else {
            this._acceleration.y = 0;
        }
        if (this._isBouncingLeft) {
            this._velocity.x = -this._maxVelocityX;
            this._velocity.x *= -this._bounceFactor;
        } else if (this._isBouncingRight) {
            this._velocity.x = this._maxVelocityX;
            this._velocity.x *= -this._bounceFactor;
        } else if (this._isBouncingUp) {
            this._velocity.y = 3;
            this._velocity.y *= -this._bounceFactor;
            this._acceleration.y = 0;
        }
        // NOTE: Updates the velocity by the acceleration scaled by delta (times)
        this._velocity.add(this._acceleration.clone().scale(delta));
        if (this._velocity.x > this._maxVelocityX) {
            this._velocity.x = this._maxVelocityX;
        } else if (this._velocity.x < -this._maxVelocityX) {
            this._velocity.x = -this._maxVelocityX;
        }
        // NOTE: Limit maxVelocity x or y
        if (this._velocity.y > this._maxVelocityY) {
            this._velocity.y = this._maxVelocityY;
        } else if (this._velocity.y < -this._maxVelocityY) {
            this._velocity.y = -this._maxVelocityY;
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
        let data: CollisionData;
        switch (message.code) {
            case MessageType.KEY_UP:
                switch (message.context) {
                    case Keys.A:
                    case Keys.D:
                        this._velocity = new Vector3(0, this._velocity.y, 0);
                    case Keys.Space:
                        this._acceleration = new Vector3(0, this._velocity.y, 0);
                        this.changeSprite(this._idleSpriteName, [0, 1, 2, 1]);
                        break;
                }
                break;
            case MessageType.KEY_DOWN:
                switch (message.context) {
                    case Keys.A:
                        this._acceleration.add(new Vector3(-this._maxVelocityX, 0, 0));
                        this.changeSprite(this._walkSpriteName, [0, 1, 2, 3, 4, 5, 6, 7]);
                        this._owner!.transform.rotation.y = 3.14159;
                        break;
                    case Keys.D:
                        this._acceleration.add(new Vector3(this._maxVelocityX, 0, 0));
                        this.changeSprite(this._walkSpriteName, [0, 1, 2, 3, 4, 5, 6, 7]);
                        this._owner!.transform.rotation.y = 0;
                        break;
                    case Keys.K:
                        this.onJump();
                        break;
                    case Keys.L:
                        this.onAttack();
                        break;
                    case Keys.I:
                        log(LogLevel.debug, `${this._owner!.getWorldPosition().x}, \
                            ${this._owner!.getWorldPosition().y}, ${this._owner!.getWorldPosition().z}`);
                        break;
                }
                break;
            case MessageType.COLLISION_ENTRY:
                data = (message.context as CollisionData);
                if (data.a.name.includes(this._groundCollisionComponent) && 
                    data.b.name === this._playerCollisionComponent || 
                    data.b.name === this._playerCollisionComponent && 
                    data.a.name.includes(this._groundCollisionComponent)) {
                    this._isJumping = false;
                    this._velocity.y = 0;
                    this._acceleration.y = 0;
                }
                if ((data.a.name === this._enemyCollisionComponent && 
                    data.b.name === this._playerCollisionComponent) ||
                    (data.a.name === this._playerCollisionComponent && 
                    data.b.name === this._enemyCollisionComponent)) {
                    if (!this._isAttacking) {
                        this.onTakeDamage();
                        if (this._isAlive) {
                            this.die();
                            Message.send(MessageType.PLAYER_DIED, this);
                        }
                    } else if (data.a.name === this._enemyCollisionComponent) {
                        if (data.a.owner!.name === "boss") {
                            (this._owner!.parent!.getObjectByName(
                                data.a.owner!.name)!.getBehaviourByName(
                                    "enemycontroller")! as BossBehaviour).takeDamage();
                        } else {
                            (this._owner!.parent!.getObjectByName(
                                data.a.owner!.name)!.getBehaviourByName(
                                    "enemycontroller")! as EnemyBehaviour).takeDamage();
                        }
                    } else if (data.b.name === this._enemyCollisionComponent) {
                        if (data.b.owner!.name === "boss") {
                            (this._owner!.parent!.getObjectByName(
                                data.b.owner!.name)!.getBehaviourByName(
                                    "enemycontroller")! as BossBehaviour).takeDamage();
                        } else {
                            (this._owner!.parent!.getObjectByName(
                                data.b.owner!.name)!.getBehaviourByName(
                                    "enemycontroller")! as EnemyBehaviour).takeDamage();
                        }
                    }
                }
                if (data.a.name === "platformcollision" && 
                    data.b.name === this._playerCollisionComponent ||
                    data.b.name === "platformcollision" &&
                    data.a.name === this._playerCollisionComponent) {
                    this._isBouncingUp = true;
                }
                if (data.a.name === this._deathCollisionComponent && 
                    data.b.name === this._playerCollisionComponent || 
                    data.b.name === this._playerCollisionComponent && 
                    data.a.name === this._deathCollisionComponent) {
                    this.die();
                }
                if (data.a.name === "leftboundary" && 
                    data.b.name === this._playerCollisionComponent ||
                    data.b.name === "leftboundary" &&
                    data.a.name === this._playerCollisionComponent) {
                    this._isBouncingLeft = true;
                }
                if (data.a.name === "rightboundary" && 
                    data.b.name === this._playerCollisionComponent ||
                    data.b.name === "rightboundary" &&
                    data.a.name === this._playerCollisionComponent) {
                    this._isBouncingRight = true;
                }
                break;
            case MessageType.COLLISION_UPDATE:
                data = (message.context as CollisionData);
                if (data.a.name.includes(this._groundCollisionComponent) && 
                    data.b.name === this._playerCollisionComponent || 
                    data.b.name === this._playerCollisionComponent && 
                    data.a.name.includes(this._groundCollisionComponent)) {
                    this._isJumping = false;
                    this._acceleration.y = 0;
                }
                break;
            case MessageType.COLLISION_EXIT:
                data = (message.context as CollisionData);
                if (data.a.name === this._groundCollisionComponent && 
                    data.b.name === this._playerCollisionComponent || 
                    data.b.name === this._playerCollisionComponent && 
                    data.a.name === this._groundCollisionComponent) {
                    this._isJumping = true; // NOTE: Triggers falling
                    // REVIEW: This also causes the player to fall through the level on a zone change.
                }
                if (data.a.name === "platformcollision" && 
                    data.b.name === this._playerCollisionComponent ||
                    data.b.name === "platformcollision" &&
                    data.a.name === this._playerCollisionComponent) {
                    this._isBouncingUp = false;
                    this._isJumping = true;
                }
                if (data.a.name === "leftboundary" && 
                    data.b.name === this._playerCollisionComponent ||
                    data.b.name === "leftboundary" &&
                    data.a.name === this._playerCollisionComponent) {
                    this._isBouncingLeft = false;
                }
                if (data.a.name === "rightboundary" && 
                    data.b.name === this._playerCollisionComponent ||
                    data.b.name === "rightboundary" &&
                    data.a.name === this._playerCollisionComponent) {
                    this._isBouncingRight = false;
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
                        this._isAttacking = false;
                        this.changeSprite(this._idleSpriteName, [0, 1, 2, 1]);
                        Message.unsubscribe(MessageType.ANIMATION_COMPLETE, this);
                        break;
                }
        }
    }
    /**
     * Called when the owner takes damage. Usually collided with an enemy.
     * @returns void
     */
    private onTakeDamage(): void {
        this._owner!.transform.position.add(new Vector3(-20, 0, 0));
        if (!this._isAttacking) {
            AudioManager.playSound("playerhit");
            this.changeSprite(this._hitSpriteName, [0, 1, 0, 1]);
            if (--this._hitPoints <= -1) {
                this.die();
            }
        }
    }
    /**
     * Changes the sprite of the owner.
     * *NOTE*: This can only be done for animated sprite materials.
     * @param  {string} materialName
     * @param  {Array<number>} frameSequence
     * @returns void
     */
    private changeSprite(materialName: string, frameSequence: Array<number>): void {
        if (this._sprite!.sprite.materialName !== materialName) {
            let newSpriteComponent = new AnimatedSpriteComponent(
                new AnimatedSpriteComponentData(JSON.parse(JSON.stringify({
                    name: this._animatedSpriteName,
                    type: "animatedsprite",
                    materialName: materialName,
                    frameHeight: 72,
                    frameWidth: 72,
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
     * Kills the owner entity.
     * @returns void
     */
    private die(): void {
        this._isAlive = false;
        this.changeSprite(this._dieSpriteName, [0, 1, 2, 3, 4]);
        AudioManager.stopAll();
        AudioManager.playSound("death");
        AudioManager.playSound("deathmusic");
        (this._owner!.getComponentByName(this._playerCollisionComponent) as CollisionComponent).isStatic = true;
        Message.unsubscribe(MessageType.KEY_DOWN, this);
        Message.unsubscribe(MessageType.KEY_UP, this);
        setTimeout(() => {
            let zoneIndex = ZoneManager.getRegisteredZoneIndex("deathscreen.sequence");
            if (zoneIndex === undefined) {
                log(LogLevel.error, `The Zone index of deathscreen.sequence could not be found!`, 
                    ErrorCode.ZoneDoesNotExist);
            }
            ZoneManager.changeZone(zoneIndex!);
        }, 5000);
    }
    /**
     * Causes the owner to perform a jump.
     * @returns void
     */
    private onJump(): void {
        if (this._isAlive && !this._isJumping) {
            log(LogLevel.debug, `Player jumping ${-this._maxVelocityY}`);
            this._isJumping = true;
            this._velocity.y = -(this._maxVelocityY);
            this.changeSprite(this._jumpSpriteName, [0, 1, 2, 3, 3, 3, 3]);
            AudioManager.playSound("playerjump");
        }
    }
    /**
     * Causes the owner to perform an attack.
     * @returns void
     */
    private onAttack(): void {
        if (this._sprite!.sprite.materialName === this._idleSpriteName) this._isAttacking = false;
        if (this._isAlive && !this._isAttacking) {
            this._isAttacking = true;
            this.changeSprite(this._attackSpriteName, [0, 1, 2]);
            AudioManager.playSound("playerattack");
        }
    }
}