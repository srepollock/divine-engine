import { log, LogLevel } from "../core/loggingsystem/src";
import { IMessageHandler, Message } from "../core/messagesystem";
import { ZoneManager } from "../zones";
import { Behaviour } from "./behaviour";
import { OpeningGUIBehaviourData } from "./openingguibehaviourdata";

export class OpeningGUIBehaviour extends Behaviour implements IMessageHandler {
    private _actions: Map<string, string> = new Map();
    constructor(data: OpeningGUIBehaviourData) {
        super(data);
        this._actions = data.actions;
        this.subscribeAll();
    }
    public update(delta: number): void {
        super.update(delta);
    }
    public onMessage(message: Message): void {
        if (this._actions.get(message.code) === undefined) {
            return;
        }
        if (this._actions.get(message.code) !== undefined) {
            switch (this._actions.get(message.code)) {
                case "nextScene":
                    ZoneManager.changeZone(ZoneManager.activeZoneIndex + 1);
                    this.unsubscribeAll();
                    break;
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