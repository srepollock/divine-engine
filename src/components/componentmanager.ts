import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
import { IComponent } from "./icomponent";
import { IComponentBuilder } from "./icomponentbuilder";

export class ComponentManager {
    private static _registeredBuilders: Map<string, IComponentBuilder> = new Map();
    public static registerBuilder(builder: IComponentBuilder): void {
        ComponentManager._registeredBuilders.set(builder.type, builder);
    }
    public static extractComponent(json: any): IComponent | undefined {
        if (json.type !== undefined) {
            if (ComponentManager._registeredBuilders.get(String(json.type)) !== undefined) {
                return ComponentManager._registeredBuilders.get(String(json.type).toLowerCase())!.buildFromJson(json);
            }
            log(LogLevel.error, `Component manager error: Type is missing or builder is not registered for type.`, 
                ErrorCode.MissingTypeBuilder);
        }
        log(LogLevel.error, `Component type was undefined.`, ErrorCode.TypeUndefined);
    }
}