import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Entity } from "../core/entity";
import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { IMessageHandler, Message, MessageType } from "../core/messagesystem";
import { ZoneManager } from "../zones";
import { Behaviour } from "./behaviour";
import { GUIBehaviourData } from "./guibehaviourdata";
import { GUIButtonBehaviour } from "./guibuttonbehaviourdata";

export class GUIBehaviour extends Behaviour implements IMessageHandler {
    private _actions: Map<string, Map<number, string>> = new Map();
    private _cursorIndex: number = 0;
    private _cursor: string;
    private _buttons: Array<string> = new Array();
    constructor(data: GUIBehaviourData) {
        super(data);
        this._actions = data.actions;
        this._buttons = data.buttons;
        this._cursor = data.cursor;
        if (this._cursor === undefined) {
            log(LogLevel.error, `Cursor could not be found as a child of the guibehaviour owner.`, ErrorCode.NoCursor);
        }
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
            if (this._actions.get(message.code)!.get(message.context) !== undefined) {
                let button: Entity | undefined;
                let zoneName: string;
                let cursor: Entity | undefined;
                switch (this._actions.get(message.code)!.get(message.context)) {
                    case "moveCursorUp":
                        this._cursorIndex--;
                        if (this._cursorIndex < 0) {
                            this._cursorIndex = this._buttons.length - 1;
                        }
                        button = this._owner!.getObjectByName(this._buttons[this._cursorIndex]);
                        cursor = this._owner!.getObjectByName(this._cursor);
                        cursor!.transform.position.y = button!.transform.position.y + 30;
                        break;
                    case "moveCursorDown":
                        this._cursorIndex++;
                        if (this._cursorIndex > this._buttons.length - 1) {
                            this._cursorIndex = 0;
                        }
                        button = this._owner!.getObjectByName(this._buttons[this._cursorIndex]);
                        cursor = this._owner!.getObjectByName(this._cursor);
                        cursor!.transform.position.y = button!.transform.position.y + 30;
                        break;
                    case "cursorSelect":
                        button = this._owner!.getObjectByName(this._buttons[this._cursorIndex]);
                        if (button === undefined) {
                            log(LogLevel.error, 
                                `Button ${this._buttons[this._cursorIndex]} does not exist in the Zone!`, 
                                ErrorCode.EntityChildNotFound);
                        } else {
                            zoneName = (button.getBehaviourByName(
                                this._buttons[this._cursorIndex]) as GUIButtonBehaviour).zoneName;
                            if (zoneName.toLowerCase() === "exit") {
                                Message.sendPriority(MessageType.EXIT, null);
                            }
                            let zoneIndex = ZoneManager.getRegisteredZoneIndex(zoneName);
                            if (zoneIndex === undefined) {
                                log(LogLevel.error, `The Zone index of ${zoneName} could not be found!`, 
                                    ErrorCode.ZoneDoesNotExist);
                            }
                            ZoneManager.changeZone(zoneIndex!);
                        }
                        this.unsubscribeAll();
                        break;
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