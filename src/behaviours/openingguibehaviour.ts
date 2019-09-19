import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { IMessageHandler, Message } from "../core/messagesystem";
import { ZoneManager } from "../zones";
import { Behaviour } from "./behaviour";
import { OpeningGUIBehaviourData } from "./openingguibehaviourdata";

export class OpeningGUIBehaviour extends Behaviour implements IMessageHandler {
    private _actions: Map<string, string> = new Map();
    private _totalTime: number = 0;
    constructor(data: OpeningGUIBehaviourData) {
        super(data);
        this._actions = data.actions;
        this.subscribeAll();
    }
    public update(delta: number): void {
        this._totalTime += delta;
        super.update(delta);
    }
    public onMessage(message: Message): void {
        if (this._actions.get(message.code) === undefined) {
            return;
        }
        if (this._actions.get(message.code) !== undefined) {
            switch (this._actions.get(message.code)) {
                case "nextScene":
                    if (this._totalTime > 2 && ZoneManager.activeZone !== undefined) {
                        ZoneManager.changeZone(ZoneManager.activeZoneIndex + 1);
                        this.unsubscribeAll();
                    }
                    break;
                case "titlescreen":
                    if (this._totalTime > 2 && ZoneManager.activeZone !== undefined) {
                        let zoneIndex = ZoneManager.getRegisteredZoneIndex("titlescreen");
                        if (zoneIndex === undefined) {
                            log(LogLevel.error, `The Zone index of titlescreen could not be found!`, 
                                ErrorCode.ZoneDoesNotExist);
                        }
                        ZoneManager.changeZone(zoneIndex!);
                        this.unsubscribeAll();
                    }
            }
        }
    }
    private subscribeAll(): void {
        this._actions.forEach((key, value) => {
            log(LogLevel.debug, `GUIBehaviour sub: ${key}, ${value}`);
            Message.subscribe(value, this);
        });
    }
    private unsubscribeAll(): void {
        this._actions.forEach((key, value) => {
            log(LogLevel.debug, `GUIBehaviour unsub: ${key}, ${value}`);
            Message.unsubscribe(value, this);
        });
    }
}