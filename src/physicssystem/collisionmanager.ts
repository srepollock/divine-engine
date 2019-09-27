import { CollisionComponent } from "../components/collisioncomponent";
import { Message } from "../core/messagesystem/message";
import { MessageType } from "../core/messagesystem/messagetype";
import { CollisionData } from "./collisiondata";

export class CollisionManager {
    private static _totalTime: number = 0;
    private static _components: Array<CollisionComponent> = new Array();
    private static _collisionData: Array<CollisionData> = new Array();
    /**
     * Class constructor.
     */
    private constructor() {

    }
    /**
     * Initializes the Collision manager.
     * @returns void
     */
    public static initialize(): void {
        new CollisionManager();
    }
    /**
     * Registers a collision component to the manager.
     * @param  {CollisionComponent} component
     * @returns void
     */
    public static registerCollisionComponent(component: CollisionComponent): void {
        CollisionManager._components.push(component);
    }
    /**
     * Unregisters a collision component from the manager.
     * @param  {CollisionComponent} component
     * @returns void
     */
    public static unregisterCollisionComponent(component: CollisionComponent): void {
        let collisionIndex: number = CollisionManager._components.indexOf(component);
        if (collisionIndex !== -1) {
            CollisionManager._components.slice(collisionIndex, 1);
        }
    }
    /**
     * Clears the collision manager of all collisions.
     * @returns void
     */
    public static clear(): void {
        CollisionManager._components.length = 0;
    }
    /**
     * Updates the collisions in the collision system and looks for new ones.
     * @param  {number} delta
     * @returns void
     */
    public static update(delta: number): void {
        CollisionManager._totalTime += delta;
        for (let c = 0; c < CollisionManager._components.length; c++) { // Using for loops for break/continue
            let a = CollisionManager._components[c];
            for (let o = 0; o < CollisionManager._components.length; o++) {
                let b = CollisionManager._components[o];
                if (a === b) continue;
                if (a.isStatic || b.isStatic) continue;
                if (a.shape.intersect(b.shape)) {
                    let exists: boolean = false;
                    for (let d = 0; d < CollisionManager._collisionData.length; ++d) {
                        let data = CollisionManager._collisionData[d];
                        if ((data.a === a && data.b === b) || (data.a === b && data.b === a)) {
                            a.onCollisionUpdate(b);
                            b.onCollisionUpdate(a);
                            data.time = CollisionManager._totalTime;
                            Message.sendPriority(MessageType.COLLISION_UPDATE, undefined, data);
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        let col = new CollisionData(CollisionManager._totalTime, a, b);
                        a.onCollisionEntry(b);
                        b.onCollisionEntry(a);
                        Message.sendPriority(MessageType.COLLISION_ENTRY, undefined, col);
                        CollisionManager._collisionData.push(col);
                    }
                }
            }
        }
        let removeData: Array<CollisionData> = new Array();
        CollisionManager._collisionData.forEach((d) => {
            if (d.time !== CollisionManager._totalTime) {
                removeData.push(d);
                d.a.onCollisionExit(d.b);
                d.b.onCollisionExit(d.a);
                Message.sendPriority(MessageType.COLLISION_EXIT, undefined, d);
            }
        });
        while (removeData.length !== 0) {
            let index = CollisionManager._collisionData.indexOf(removeData[0]);
            CollisionManager._collisionData.splice(index, 1);
            removeData.shift();
        }
    }
}