import { Vector2 } from "../math/vector2";
import { Vector3 } from "../math/vector3";
import { AIMovementBehaviourData } from "./aimovementbehaviourdata";
import { Behaviour } from "./behaviour";
export class AIMovementBehaviour extends Behaviour {
    private _start: Vector2;
    private _end: Vector2;
    private _direction: Vector2;
    private _acceleration: Vector2 = new Vector2();
    private _velocity: Vector2 = new Vector2();
    private _maxVelocityX: number = 2;
    private _maxVelocityY: number = 2;
    private _rotate: boolean = true;
    constructor(data: AIMovementBehaviourData) {
        super(data);
        this._start = data.start;
        this._end = data.end;
        this._direction = data.direction;
        this._acceleration = this._direction;
        this._rotate = data.rotate;
    }
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