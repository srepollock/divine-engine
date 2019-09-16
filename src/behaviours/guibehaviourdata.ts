import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { IBehaviourData } from "./ibehaviourdata";

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