import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Entity } from "../core/entity";
import { IMessageHandler, Message, MessageType } from "../core/messagesystem";
import { CollisionData } from "../physicssystem/collisiondata";
import { AudioManager } from "../soundsystem/audiomanager";
import { ZoneManager } from "../zones/zonemanager";
import { Behaviour } from "./behaviour";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { IBehaviourData } from "./ibehaviourdata";
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
    /**
     * Updates the behaviour
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        super.update(delta);
    }
    /**
     * Called when the behaviour handles a message
     * @param  {Message} message
     * @returns void
     */
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
                    AudioManager.playSound("zonecomplete");
                    setTimeout(() => {}, 3000);
                    ZoneManager.changeZone(zoneIndex!);
                }
                break;
        }
    }
}

export class FlagBehaviourData implements IBehaviourData {
    public name!: string;
    public zoneName!: string;
    public flagCollisionComponent!: string;
    public playerCollisionComponent!: string;
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
        if (json.zoneName === undefined) {
            log(LogLevel.error, `zoneName must be defined in behaviour data.`, ErrorCode.NoName);
        } else {
            this.zoneName = String(json.zoneName);
        }
        if (json.flagCollisionComponent === undefined) {
            log(LogLevel.error, `flagCollisionComponent must be defined in behaviour data.`, ErrorCode.NoName);
        } else {
            this.flagCollisionComponent = String(json.flagCollisionComponent);
        }
        if (json.playerCollisionComponent === undefined) {
            log(LogLevel.error, `playerCollisionComponent must be defined in behaviour data.`, ErrorCode.NoName);
        } else {
            this.playerCollisionComponent = String(json.playerCollisionComponent);
        }
    }
}

export class FlagBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "flag";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new FlagBehaviourData();
        data.setFromJson(json);
        return new FlagBehaviour(data);
    }
}