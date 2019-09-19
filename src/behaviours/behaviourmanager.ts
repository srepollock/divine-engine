import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class BehaviourManager {
    private static _registeredBuilders: Map<string, IBehaviourBuilder> = new Map();
    /**
     * Registers a behaviour builder for a type of behaviour.
     * @param  {IBehaviourBuilder} builder
     * @returns void
     */
    public static registerBuilder(builder: IBehaviourBuilder): void {
        BehaviourManager._registeredBuilders.set(builder.type, builder);
    }
    /**
     * Parses the behaviour given by JSON with one of the builders given. If no builders have the same type as the given
     * object, an error will be thrown.
     * @param  {any} json
     * @returns IBehaviour
     */
    public static extractBehaviour(json: any): IBehaviour | undefined {
        if (json.type !== undefined) {
            if (BehaviourManager._registeredBuilders.get(String(json.type)) !== undefined) {
                return BehaviourManager._registeredBuilders.get(String(json.type).toLowerCase())!.buildFromJson(json);
            }
            log(LogLevel.error, `Behaviour manager error: Type is missing or builder is not registered for type.`, 
                ErrorCode.MissingTypeBuilder);
        }
        log(LogLevel.error, `Behaviour type was undefined.`, ErrorCode.TypeUndefined);
    }
}