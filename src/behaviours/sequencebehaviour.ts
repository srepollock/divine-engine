import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { AnimatedSpriteComponent } from "../components/animatedspritecomponent";
import { Vector3 } from "../math/vector3";
import { ZoneManager } from "../zones/zonemanager";
import { Behaviour } from "./behaviour";
import { SequenceBehaviourData } from "./sequencebehaviourdata";

export class Action {
    constructor(
        public start: Vector3 = new Vector3(), 
        public end: Vector3 = new Vector3(), 
        public time: number = 0) {
        
    }
}

export class SequenceBehaviour extends Behaviour {
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
        if (this._timeCount >= this.currentAction().time) {
            this._timeCount = 0;
            this._actionIndex += 1;
        }
        if (this._actionIndex > this._actions.length - 1) {
            ZoneManager.changeNextZone(); // REVIEW: There is a race condition here
            // TODO: Should be changed with a semaphore
            return;
        }
        let direction: Vector3 = this.currentAction().end.clone().subtract(
            this.currentAction().start);
        let previousDirection: Vector3;
        if (this._actionIndex === 0) {
            previousDirection = this.currentAction().end.clone().subtract(this.currentAction().start);
        } else {
            previousDirection = this._actions[this._actionIndex - 1].end.clone().subtract(
                this._actions[this._actionIndex - 1].start);
        }
        if (direction.x < 0 || previousDirection.x < 0) {
            this._owner!.transform.rotation.y = 3.14159;
        } else {
            this._owner!.transform.rotation.y = 0;
        }
        let interprolation: number = (delta / this._actions[this._actionIndex].time);
        let step: Vector3 = direction.multiply(new Vector3(interprolation, interprolation, interprolation));
        this._owner!.transform.position.add(step);
        super.update(delta); 
    }
}