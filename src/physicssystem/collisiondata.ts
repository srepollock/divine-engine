import { CollisionComponent } from "../components/collisioncomponent";

export class CollisionData {
    public a: CollisionComponent;
    public b: CollisionComponent;
    public time: number;
    constructor(time: number, a: CollisionComponent, b: CollisionComponent) {
        this.time = time;
        this.a = a;
        this.b = b;
    }
}