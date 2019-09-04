import { IComponent, IComponentBuilder } from ".";

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
            throw new Error(`Component manager error: Type is missing or builder is not registered for type.`);
        }
        throw new Error(`Component type was undefined.`);
    }
}