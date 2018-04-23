import { Component } from "./component";
import { DObject } from "./dobject";
export declare class Transform {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
}
export declare class Entity extends DObject {
    transform: Transform;
    children: Array<Entity>;
    components: Array<Component>;
    constructor(id?: string, transform?: Transform, children?: Array<Entity>, components?: Array<Component>);
    addComponents(...components: Array<Component>): void;
    hasComponent(type: string): boolean;
}
