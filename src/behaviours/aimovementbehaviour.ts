import { Vector2 } from "../math/vector2";
import { Vector3 } from "../math/vector3";
import { AIMovementBehaviourData } from "./aimovementbehaviourdata";
import { Behaviour } from "./behaviour";
export class AIMovementBehaviour extends Behaviour {
    private _start: Vector2;
    private _end: Vector2;
    private _direction: Vector2;
    constructor(data: AIMovementBehaviourData) {
        super(data);
        this._start = data.start;
        this._end = data.end;
        this._direction = data.direction;
    }
    public update(delta: number): void {
        this._owner.transform.position.add(new Vector3(this._direction.x * delta, this._direction.x * delta, 0));
        if (this._owner.transform.position >= this._start ||
            this._owner.transform.position <= this._end) {
            this._direction.x = -(this._direction.x);
            this._direction.y = -(this._direction.y);
        }
        super.update(delta);
    }
}