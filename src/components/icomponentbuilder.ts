import { IComponent } from "./icomponent";

export interface IComponentBuilder {
    readonly type: string;
    buildFromJson(json: any): IComponent;
}