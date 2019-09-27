import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { AnimatedSpriteComponent, AnimatedSpriteComponentData } from "../components/animatedspritecomponent";
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
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { IBehaviourData } from "./ibehaviourdata";

export class PlayerBehaviour extends Behaviour implements IMessageHandler {
    public static lives: number = 3; // TODO: Change these to options
    public static hitPoints: number = 2;
    private _startingHitPoints: number = 2;
    private _acceleration: Vector2 = new Vector2(0, 0);
    private _velocity: Vector2 = new Vector2();
    private _isAlive: boolean = true;
    private _isJumping: boolean = false;
    private _isAttacking: boolean = false;
    private _isBouncingLeft: boolean = false;
    private _isBouncingRight: boolean = false;
    private _isBouncingUp: boolean = false;
    private _invulnerable: boolean = false;
    private _zoneLoading: boolean = false;
    private _playerCollisionComponent: string;
    private _groundCollisionComponent: string;
    private _enemyCollisionComponent: string;
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
     * Gets if the player is attacking.
     * @returns boolean
     */
    public get isAttacking(): boolean {
        return this._isAttacking;
    }
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
        Message.subscribe(MessageType.ZONE_LOADED, this);
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
                    data.a.name.includes(this._groundCollisionComponent) &&
                    !this._zoneLoading) {
                    this._isJumping = false;
                    this._velocity.y = 0;
                    this._acceleration.y = 0;
                }
                if (((data.a.name === this._enemyCollisionComponent && 
                        data.b.name === this._playerCollisionComponent) ||
                    (data.a.name === this._playerCollisionComponent && 
                        data.b.name === this._enemyCollisionComponent)
                    ) && !this._invulnerable) { // NOTE: Invulnerable is only for enemies
                        if (!this._isAttacking) {
                            this.onTakeDamage();
                        }
                }
                if (data.a.name === this._deathCollisionComponent && 
                    data.b.name === this._playerCollisionComponent || 
                    data.b.name === this._playerCollisionComponent && 
                    data.a.name === this._deathCollisionComponent) {
                    this.die();
                }
                if (data.a.name === "platformcollision" && 
                    data.b.name === this._playerCollisionComponent ||
                    data.b.name === "platformcollision" &&
                    data.a.name === this._playerCollisionComponent) {
                    this._isBouncingUp = true;
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
                if (data.a.name === "rightboundary" && 
                    data.b.name === this._playerCollisionComponent ||
                    data.b.name === "rightboundary" &&
                    data.a.name === this._playerCollisionComponent) {
                    this._isBouncingRight = true;
                }
                if ((data.a.name === "projectilecollision" && 
                    data.b.name === this._playerCollisionComponent) || 
                    (data.b.name === "projectilecollision" && 
                    data.a.name === this._playerCollisionComponent) && 
                    !this._invulnerable && 
                    !this._isAttacking) {
                    this.onTakeDamage();
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
                if ((
                    (data.a.name === this._groundCollisionComponent && 
                        data.b.name === this._playerCollisionComponent) || 
                    (data.b.name === this._playerCollisionComponent && 
                        data.a.name === this._groundCollisionComponent)) 
                    && !this._zoneLoading) {
                    this._isJumping = true; // NOTE: Triggers falling
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
                    case this._hitSpriteName:
                    case this._attackSpriteName:
                    case this._jumpSpriteName:
                        this._isAttacking = false;
                        this.changeSprite(this._idleSpriteName, [0, 1, 2, 1]);
                        Message.unsubscribe(MessageType.ANIMATION_COMPLETE, this);
                        break;
                }
                break;
            case MessageType.ZONE_LOADED:
                PlayerBehaviour.hitPoints = this._startingHitPoints;
                this._isJumping = false;
                this._zoneLoading = true;
                this._invulnerable = true;
                setTimeout(() => {
                    this._zoneLoading = false;
                    this._invulnerable = false;
                }, 200);
                break;
        }
    }
    /**
     * Called when the owner takes damage. Usually collided with an enemy.
     * If not dead (hp < 0), will turn the player static for 1 second (invulnerable from attacts)
     * @returns void
     */
    public onTakeDamage(): void {
        AudioManager.playSound("playerhit");
        this.changeSprite(this._hitSpriteName, [0, 1, 0, 1]);
        Message.subscribe(MessageType.ANIMATION_COMPLETE, this);
        this._invulnerable = true;
        if (--PlayerBehaviour.hitPoints <= -1) {
            this.die();
        } 
        if (this._isAlive) {
            setTimeout(() => {
                this._invulnerable = false;
            }, 1000);
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
        this._invulnerable = true;
        this.changeSprite(this._dieSpriteName, [0, 1, 2, 3, 4]);
        Message.unsubscribe(MessageType.KEY_DOWN, this);
        Message.unsubscribe(MessageType.KEY_UP, this);
        AudioManager.stopAll();
        AudioManager.playSound("death");
        AudioManager.playSound("deathmusic");
        if (PlayerBehaviour.lives <= 0) {
            Message.send(MessageType.PLAYER_DIED, this);
            // NOTE: if lives <= 0; game over
            setTimeout(() => {
                let zoneIndex = ZoneManager.getRegisteredZoneIndex("deathscreen.sequence");
                if (zoneIndex === undefined) {
                    log(LogLevel.error, `The Zone index of deathscreen.sequence could not be found!`, 
                        ErrorCode.ZoneDoesNotExist);
                }
                ZoneManager.changeZone(zoneIndex!);
            }, 5000);
        } else {
            // NOTE: else, reload this zone, decrement life.
            PlayerBehaviour.lives -= 1;
            setTimeout(() => {
                ZoneManager.changeZone(ZoneManager.activeZoneIndex);
            }, 5000);
        }
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

export class PlayerBehaviourData implements IBehaviourData {
    public name!: string;
    public acceleration: Vector2 = new Vector2(0, 0);
    public playerCollisionComponent!: string;
    public groundCollisionComponent!: string;
    public enemyCollisionComponent!: string;
    public flagCollisionComponent!: string;
    public deathCollisionComponent: string = "";
    public animatedSpriteName!: string;
    public attackSpriteName!: string;
    public hitSpriteName!: string;
    public dieSpriteName!: string;
    public walkSpriteName!: string;
    public idleSpriteName!: string;
    public jumpSpriteName!: string;
    public maxVelocityX: number = 5;
    public maxVelocityY: number = 15;
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
        if (json.deathCollisionComponent !== undefined) {
            this.deathCollisionComponent = String(json.deathCollisionComponent);
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

export class PlayerBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "player";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new PlayerBehaviourData();
        data.setFromJson(json);
        return new PlayerBehaviour(data);
    }
}