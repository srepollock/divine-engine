import { Entity } from "../core/entity";
import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { IMessageHandler, Message, MessageType, MessageBus } from "../core/messagesystem";
import { CollisionData } from "../physicssystem/collisiondata";
import { ZoneManager } from "../zones/zonemanager";
import { Behaviour } from "./behaviour";
import { FlagBehaviourData } from "./flagbehaviourdata";
export class FlagBehaviour extends Behaviour implements IMessageHandler {
    private _zoneName: string;
    private _playerCollisionComponent: string;
    private _flagCollisionComponent: string;
    constructor(data: FlagBehaviourData) {
        super(data);
        this._zoneName = data.zoneName;
        this._flagCollisionComponent = data.flagCollisionComponent;
        this._playerCollisionComponent = data.playerCollisionComponent;
        Message.subscribe(MessageType.COLLISION_ENTRY, this);
    }
    public setOwner(owner: Entity): void {
        this._owner = owner;
    }
    public update(delta: number): void {
        super.update(delta);
    }
    public onMessage(message: Message): void {
        log(LogLevel.debug, `${this.name} Collision`);
        let data: CollisionData = (message.context as CollisionData);
        switch (message.code) {
            case MessageType.COLLISION_ENTRY:
                if ((data.a.name === this._flagCollisionComponent && 
                    data.b.name === this._playerCollisionComponent)
                    || (data.b.name === this._flagCollisionComponent && 
                    data.a.name === this._playerCollisionComponent )) {
                    let zoneIndex = ZoneManager.getRegisteredZoneIndex(this._zoneName);
                    if (zoneIndex === undefined) {
                        log(LogLevel.error, `The Zone index of ${this._zoneName} could not be found!`, 
                            ErrorCode.ZoneDoesNotExist);
                    }
                    ZoneManager.changeZone(zoneIndex!);
                }
                break;
        }
    }
}