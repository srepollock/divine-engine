import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Vector2 } from "../math/vector2";
import { Vector3 } from "../math/vector3";
import { Behaviour } from "./behaviour";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { IBehaviourData } from "./ibehaviourdata";
export class AIMovementBehaviour extends Behaviour {
    private _start: Vector2;
    private _end: Vector2;
    private _direction: Vector2;
    private _acceleration: Vector2 = new Vector2();
    private _velocity: Vector2 = new Vector2();
    private _maxVelocityX: number = 2;
    private _maxVelocityY: number = 2;
    private _rotate: boolean = true;
    /**
     * Class constructor
     * @param  {AIMovementBehaviourData} data
     */
    constructor(data: AIMovementBehaviourData) {
        super(data);
        this._start = data.start;
        this._end = data.end;
        this._direction = data.direction;
        this._acceleration = this._direction;
        this._rotate = data.rotate;
    }
    /**
     * The update call from the owner. Update the movement here.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
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
}

export class AIMovementBehaviourData implements IBehaviourData {
    public name!: string;
    public start: Vector2 = new Vector2();
    public end: Vector2 = new Vector2();
    public direction: Vector2 = new Vector2(1, 0);
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
        if (json.start !== undefined) {
            this.start.setFromJson(json.start);
        }
        if (json.end !== undefined) {
            this.end.setFromJson(json.end);
        }
        if (json.direction !== undefined) {
            this.direction.setFromJson(json.direction);
        }
        if (json.rotate !== undefined) {
            this.rotate = Boolean(json.rotate);
        }
    }
}

export class AIMovementBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "aimovement";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new AIMovementBehaviourData();
        data.setFromJson(json);
        return new AIMovementBehaviour(data);
    }
}