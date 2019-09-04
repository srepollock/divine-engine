import { IBehaviour } from "./ibehaviour";

export interface IBehaviourBuilder {
    name: string;
    readonly type: string;
    buildFromJson(json: any): IBehaviour;
}