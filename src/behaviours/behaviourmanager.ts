import { IBehaviour } from "./ibehaviour";
import { IBehaviourBuilder } from "./ibehaviourbuilder";

export class BehaviourManager {
    private static _registeredBuilders: Map<string, IBehaviourBuilder> = new Map();
    public static registerBuilder(builder: IBehaviourBuilder): void {
        BehaviourManager._registeredBuilders.set(builder.type, builder);
    }
    public static extractBehaviour(json: any): IBehaviour | undefined {
        if (json.type !== undefined) {
            if (BehaviourManager._registeredBuilders.get(String(json.type)) !== undefined) {
                return BehaviourManager._registeredBuilders.get(String(json.type).toLowerCase())!.buildFromJson(json);
            }
            throw new Error(`Behaviour manager error: Type is missing or builder is not registered for type.`);
        }
        throw new Error(`Behaviour type was undefined.`);
    }
}