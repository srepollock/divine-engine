import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
import { IBehaviourData } from "./ibehaviourdata";

export class GUIBehaviourData implements IBehaviourData {
    public name!: string;
    public actions: Map<string, string> = new Map();
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            log(LogLevel.error, `Name must be defined in behaviour data.`, ErrorCode.NoName);
        }
        this.name = String(json.name);
        if (json.actions === undefined) {
            log(LogLevel.error, `Actions must be defined in MouseBehaviours`, ErrorCode.NoActions);
        } else {
            json.actions.forEach((action: {listen: string, response: string}) => {
                if (action.listen !== undefined && action.response !== undefined) {
                    this.actions.set(String(action.listen), String(action.response));
                }
            });
        }
    }
}