import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Entity } from "../core/entity";
import { IMessageHandler, Message, MessageType } from "../core/messagesystem";
import { ZoneManager } from "../zones";
import { Behaviour } from "./behaviour";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";
import { IBehaviourData } from "./ibehaviourdata";
import { GUIButtonBehaviour } from "./guibuttonbehaviour";

export class GUIBehaviour extends Behaviour implements IMessageHandler {
    private _actions: Map<string, Map<number, string>> = new Map();
    private _cursorIndex: number = 0;
    private _cursor: string;
    private _buttons: Array<string> = new Array();
    /**
     * Class constructor.
     * @param  {GUIBehaviourData} data
     */
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
    /**
     * Updates the behaviour.
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
    /**
     * Subscribes to all messages in the actions map.
     * @returns void
     */
    private subscribeAll(): void {
        this._actions.forEach((key, value) => {
            log(LogLevel.debug, `GUIBehaviour sub: ${key}, ${value}`);
            Message.subscribe(value, this);
        });
    }
    /**
     * Unsubscribes from all messages in the actions map.
     * @returns void
     */
    private unsubscribeAll(): void {
        this._actions.forEach((key, value) => {
            log(LogLevel.debug, `GUIBehaviour unsub: ${key}, ${value}`);
            Message.unsubscribe(value, this);
        });
    }
}

export class GUIBehaviourData implements IBehaviourData {
    public name!: string;
    public actions: Map<string, Map<number, string>> = new Map();
    public cursor!: string;
    public buttons: Array<string> = new Array();
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
        if (json.cursor === undefined ) {
            log(LogLevel.error, `Cursor must be defined for behaviour data.`, ErrorCode.NoCursor);
        } else {
            this.cursor = String(json.cursor);
        }
        if (json.buttons === undefined) {
            log(LogLevel.error, `Buttons string array must be defined for behaviour data.`, ErrorCode.NoButtons);
        } else {
            json.buttons.forEach((button: any) => {
                this.buttons.push(String(button));
            });
        }
        if (json.actions === undefined) {
            log(LogLevel.error, `Actions must be defined in MouseBehaviours`, ErrorCode.NoActions);
        } else {
            json.actions.forEach((action: {listen: string, key: number, response: string}) => {
                if (action.listen !== undefined && action.key !== undefined && action.response !== undefined) {
                    if (this.actions.get(String(action.listen)) !== undefined) {
                        this.actions.get(String(action.listen))!.set(action.key, action.response);
                    } else {
                        this.actions.set(String(action.listen), 
                            new Map().set(Number(action.key), String(action.response)));
                    }
                }
            });
        }
    }
}

export class GUIBehaviourBuilder implements IBehaviourBuilder {
    public name!: string;
    /**
     * Type of behaviour
     * @returns string
     */
    public get type(): string {
        return "guibehaviour";
    }
    /**
     * Called on all builders (through IBehaviourBuilder interface).
     * @param  {any} json
     * @returns IBehaviour
     */
    public buildFromJson(json: any): IBehaviour {
        let data = new GUIBehaviourData();
        data.setFromJson(json);
        return new GUIBehaviour(data);
    }
}