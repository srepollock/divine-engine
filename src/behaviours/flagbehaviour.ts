import { Entity } from "../core/entity";
import { IMessageHandler, Message, MessageType } from "../core/messagesystem";
import { Vector2 } from "../math/vector2";
import { CollisionData } from "../physicssystem/collisiondata";
import { ZoneManager } from "../zones/zonemanager";
import { Behaviour } from "./behaviour";
import { FlagBehaviourData } from "./flagbehaviourdata";
export class FlagBehaviour extends Behaviour implements IMessageHandler {
    private _position!: Vector2;
    constructor(data: FlagBehaviourData) {
        super(data);
        Message.subscribe(MessageType.COLLISION_ENTRY, this);
    }
    public setOwner(owner: Entity): void {
        this._owner = owner;
        this._position = new Vector2(this._owner.getWorldPosition().x, this._owner.getWorldPosition().y);
    }
    public update(delta: number): void {
        super.update(delta);
    }
    public onMessage(message: Message): void {
        let data: CollisionData = (message.context as CollisionData);
        if ((data.a.name === this.name && data.b.name === "playercollision" )
            || (data.b.name === this.name && data.a.name === "playercollision" )) {
            ZoneManager.changeZone(ZoneManager.activeZoneIndex + 1);
        }
    }
}