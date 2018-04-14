import {DObject} from "./dobject";
import {Component} from "./component";

export class Transform {
    constructor(public x: number = 0, public y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

export class GameObject extends DObject {
    constructor(
        public id: string = "", 
        public transform: Transform = new Transform(), 
        public children: Array<GameObject> = new Array(),
        public components: Array<Component> = new Array()
    ) {
        super(id);
        this.transform = transform;
        this.children = children;
        this.components = components;
    }
    public addComponents(...components: Array<Component>) {
        for(let comp of components) {
            this.components!.push(comp);
        }
    }
    public hasComponent(type: string): boolean {
        let comp = this.components!.find(comp => comp.id! === type);
        if (comp !== undefined) return true;
        else return false;
    }
}