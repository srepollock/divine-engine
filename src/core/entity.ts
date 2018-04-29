import { Component } from "./component";
import { DObject } from "./dobject";
import { LogInfo } from "./logging";

export class Transform {
    constructor(public x: number = 0, public y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

export class Entity extends DObject {
    constructor(
        id: string = "",
        public transform: Transform = new Transform(), 
        public children: Array<Entity> = new Array(),
        public components: Array<Component> = new Array()
    ) {
        super(id);
        this.transform = transform;
        this.children = children;
        this.components = components;
    }
    public addComponents(...components: Array<Component>) {
        for (let comp of components) {
            this.components!.push(comp);
        }
    }
    public hasComponent(type: string): boolean {
        let comp = this.components!.find((comp) => comp.id! === type);
        if (comp !== undefined) return true;
        else return false;
    }
    public toString(): string {
        let objectString = `Entity [id:${this.id}]`;
        LogInfo(objectString);
        return objectString;
    }
}