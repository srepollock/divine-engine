import { AnimatedSpriteComponent } from "../components/animatedspritecomponent";
import { AnimatedSpriteComponentData } from "../components/animatedspritecomponentdata";
import { ErrorCode, log, LogLevel } from "../core/loggingsystem";
import { IMessageHandler } from "../core/messagesystem/imessagehandler"; 
import { Message } from "../core/messagesystem/message";
import { MessageType } from "../core/messagesystem/messagetype";
import { Keys } from "../inputsystem/keys";
import { Vector2 } from "../math/vector2";
import { Vector3 } from "../math/vector3";
import { CollisionData } from "../physicssystem/collisiondata";
import { AudioManager } from "../soundsystem/audiomanager";
import { Behaviour } from "./behaviour";
import { PlayerBehaviourData } from "./playerbehaviourdata";

export class PlayerBehaviour extends Behaviour implements IMessageHandler {
    private _hitPoints: number = 3;
    private _acceleration: Vector2 = new Vector2(0, 920);
    private _velocity: Vector2 = new Vector2();
    private _isAlive: boolean = true;
    private _isJumping: boolean = false;
    private _isAttacking: boolean = false;
    private _playerCollisionComponent: string;
    private _groundCollisionComponent: string;
    private _enemyCollisionComponent: string;
    private _animatedSpriteName: string;
    private _sprite: AnimatedSpriteComponent | undefined;
    private _maxVelocityX: number;
    private _maxVelocityY: number;
    constructor(data: PlayerBehaviourData) {
        super(data);
        this._acceleration = data.acceleration;
        this._playerCollisionComponent = data.playerCollisionComponent;
        this._groundCollisionComponent = data.groundCollisionComponent;
        this._enemyCollisionComponent = data.enemyCollisionComponent;
        this._animatedSpriteName = data.animatedSpriteName;
        this._maxVelocityX = data.maxVelocityX;
        this._maxVelocityY = data.maxVelocityY;
        Message.subscribe(MessageType.KEY_DOWN, this);
        Message.subscribe(MessageType.KEY_UP, this);
        Message.subscribe(MessageType.COLLISION_ENTRY + this._playerCollisionComponent, this);
    }
    public updateReady(): void {
        super.updateReady();
        this._sprite = this._owner.getComponentByName(this._animatedSpriteName) as AnimatedSpriteComponent;
        if (this._sprite === undefined) {
            log(LogLevel.error, 
                `AnimatedSprite named: ${this._animatedSpriteName} is not attached to the component owner.`,
                ErrorCode.SpriteNotAttached);
        }
    }
    public update(delta: number): void {
        if (!this._isAlive) {
            return;
        }
        if (this._isJumping) {
            this._acceleration.y += 9.75;
        }
        this._velocity.add(this._acceleration.clone().scale(delta));
        if (this._velocity.x > this._maxVelocityX) {
            this._velocity.x = this._maxVelocityX;
        } else if (this._velocity.x < -this._maxVelocityX) {
            this._velocity.x = -this._maxVelocityX;
        }
        this._owner.transform.position.add(new Vector3(this._velocity.x, 0, 0));
        super.update(delta); 
    }
    public onMessage(message: Message): void {
        switch (message.code) {
            case MessageType.KEY_UP:
                switch (message.context) {
                    case Keys.LeftArrow:
                    case Keys.RightArrow:
                        this._velocity = new Vector3(0, 0, 0);
                    case Keys.Space:
                        this._acceleration = new Vector3(0, 0, 0);
                        this.changeSprite("peasent_idle", [0, 1, 2, 1]);
                        break;
                }
                break;
            case MessageType.KEY_DOWN:
                switch (message.context) {
                    case Keys.LeftArrow:
                        this._acceleration = new Vector3(-0.1, this._acceleration.y, 0);
                        this.changeSprite("peasent_walk", [0, 1, 2, 3, 4, 5, 6, 7]);
                        break;
                    case Keys.RightArrow:
                        this._acceleration = new Vector3(0.1, this._acceleration.y, 0);
                        this.changeSprite("peasent_walk", [0, 1, 2, 3, 4, 5, 6, 7]);
                        break;
                    case Keys.Space:
                        this.onJump();
                        break;
                    case Keys.Z:
                        this.onAttack();
                        break;
                }
                break;
            case MessageType.COLLISION_ENTRY:
                let data: CollisionData = (message.context as CollisionData);
                if (data.a.name === this._groundCollisionComponent || data.b.name === this._groundCollisionComponent) {
                    this._isJumping = false;
                }
                if (data.a.name === this._enemyCollisionComponent || data.b.name === this._enemyCollisionComponent) {
                    if (!this._isAttacking) {
                        this.onTakeDamage();
                        if (this._isAlive) {
                            this.die();
                            Message.send(MessageType.PLAYER_DIED, this);
                        }
                    }
                }
                break;
            case MessageType.ANIMATION_COMPLETE:
                if (message.context === this._animatedSpriteName) {
                    if (this._animatedSpriteName === "peasent_die") {
                        this._sprite!.stop();
                    }
                    Message.unsubscribe(MessageType.ANIMATION_COMPLETE, this);
                    this.changeSprite("peasent_idle", [0, 1, 2, 1]);
                }
                break;
        }
    }
    private isFalling(): boolean {
        return this._velocity.y < this._maxVelocityY;
    }
    private onTakeDamage(): void {
        if (!this._isAttacking) {
            this.changeSprite("peasent_hit", [0, 1, 0, 1]);
            if (--this._hitPoints <= -1) {
                this._isAlive = false;
            }
        }
    }
    private changeSprite(materialName: string, frameSequence: Array<number>): void {
        if (this._sprite!.sprite.materialName !== materialName) {
            let newSpriteComponent = new AnimatedSpriteComponent(
                new AnimatedSpriteComponentData(JSON.parse(JSON.stringify({
                    name: "peasentsprite",
                    type: "animatedsprite",
                    materialName: materialName,
                    frameHeight: 72,
                    frameWidth: 72,
                    frameCount: frameSequence.length,
                    frameSequence: frameSequence
                })))
            );
            this._owner.removeComponent(this._sprite!.name);
            this._owner.addComponent(newSpriteComponent);
            this._sprite = this._owner.getComponentByName("peasentsprite") as AnimatedSpriteComponent;
            this._sprite.load();
        }
    }
    private die(): void {
        this._isAlive = false;
        this.changeSprite("peasent_die", [0, 1, 2, 3, 4]);
        AudioManager.playSound("death");
        AudioManager.playSound("deathmusic");
    }
    private onJump(): void {
        if (this._isAlive && !this._isJumping) {
            this._isJumping = true;
            this._acceleration = new Vector3(this._acceleration.x, this._maxVelocityY, 0);
            this.changeSprite("peasent_jump", [0, 1, 2, 3, 3, 3, 3]);
            AudioManager.playSound("jump");
        }
    }
    private onAttack(): void {
        if (this._isAlive && !this._isAttacking) {
            this.changeSprite("peasent_attack", [0, 1, 2]);
            AudioManager.playSound("attack");
        }
    }
    private onRestart(): void {
        this._owner.transform.rotation.z = 20;
        this._owner.transform.position.y = 445;
        this._isAlive = true;
        this._sprite!.play();
    }
}