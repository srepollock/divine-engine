import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { AnimatedSpriteComponent } from "../components/animatedspritecomponent";
import { AnimatedSpriteComponentData } from "../components/animatedspritecomponentdata";
import { IMessageHandler } from "../core/messagesystem/imessagehandler"; 
import { Message } from "../core/messagesystem/message";
import { MessageType } from "../core/messagesystem/messagetype";
import { Vector3 } from "../math/vector3";
import { ZoneManager } from "../zones";
import { Behaviour } from "./behaviour";
import { SequenceBehaviourData } from "./sequencebehaviourdata";
import { MessageBus } from "src/core/messagesystem";

export class Action {
    constructor(
        public start: Vector3 = new Vector3(), 
        public end: Vector3 = new Vector3(), 
        public time: number = 0,
        public skip: boolean = false) {
        
    }
}

export class SequenceBehaviour extends Behaviour implements IMessageHandler {
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
    private _timeCount: number = 0;
    private _actionIndex: number = 0;
    private _actions: Array<Action> = new Array();
    private _skip: boolean = false;
    public get actionIndex(): number {
        return this._actionIndex;
    }
    public set actionIndex(value: number) {
        this._actionIndex = value;
    }
    public get actions(): Array<Action> {
        return this._actions;
    }
    constructor(data: SequenceBehaviourData) {
        super(data);
        this._animatedSpriteName = data.animatedSpriteName;
        this._attackSpriteName = data.attackSpriteName;
        this._hitSpriteName = data.hitSpriteName;
        this._dieSpriteName = data.dieSpriteName;
        this._walkSpriteName = data.walkSpriteName;
        this._idleSpriteName = data.idleSpriteName;
        this._jumpSpriteName = data.jumpSpriteName;
        this._maxVelocityX = data.maxVelocityX;
        this._maxVelocityY = data.maxVelocityY;
        this._actions = data.actions;
        Message.subscribe(MessageType.KEY_DOWN, this);
        Message.subscribe(MessageType.KEY_UP, this);
    }
    public currentAction(): Action {
        return this._actions[this._actionIndex];
    }
    public updateReady(): void {
        super.updateReady();
        this._sprite = this._owner!.getComponentByName(this._animatedSpriteName) as AnimatedSpriteComponent;
        if (this._sprite === undefined) {
            log(LogLevel.error, 
                `AnimatedSprite named: ${this._animatedSpriteName} is not attached to the component owner.`,
                ErrorCode.SpriteNotAttached);
        }
    }
    public update(delta: number): void {
        this._timeCount += delta;
        if (this._timeCount >= this._actions[this._actionIndex].time) {
            this._timeCount = 0;
            this._actionIndex += 1;
        }
        if (this._actionIndex > this._actions.length - 1) {
            let zoneIndex = ZoneManager.getRegisteredZoneIndex("zone1");
            if (zoneIndex === undefined) {
                log(LogLevel.error, `The Zone index of zone1 could not be found!`, 
                    ErrorCode.ZoneDoesNotExist);
            }
            ZoneManager.changeZone(zoneIndex!);
            return;
        }
        let direction: Vector3 = this._actions[this._actionIndex].end.clone().subtract(
            this._actions[this._actionIndex].start);
        if (direction.x < 0) {
            this._owner!.transform.rotation.y = 3.14159;
        } else {
            this._owner!.transform.rotation.y = 0;
        }
        let interprolation: number = (delta / this._actions[this._actionIndex].time);
        let step: Vector3 = direction.multiply(new Vector3(interprolation, interprolation, interprolation));
        this._owner!.transform.position.add(step);
        super.update(delta); 
    }
    public onMessage(message: Message): void {
        let skippable = this._actions[this._actionIndex].skip;
        switch (message.code) {
            case MessageType.KEY_DOWN:
                if (skippable) {
                    // works on any key
                    this._actionIndex += 1;
                    if (this._actionIndex > this._actions.length - 1) {
                        let zoneIndex = ZoneManager.getRegisteredZoneIndex("zone1");
                        if (zoneIndex === undefined) {
                            log(LogLevel.error, `The Zone index of zone1 could not be found!`, 
                                ErrorCode.ZoneDoesNotExist);
                        }
                        ZoneManager.changeZone(zoneIndex!);
                        return;
                    }
                }
                break;
        }
    }
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
}