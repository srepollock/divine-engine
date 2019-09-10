import { IBehaviour } from "../behaviours/ibehaviour";
import { IComponent } from "../components/icomponent";
import { Transform } from "../core/transform";
import { guid } from "../helper/guid";
import { Message, IMessageHandler } from "./messagesystem";
import { Matrix4 } from "../math/matrix4";
import { Vector3 } from "../math/vector3";
import { Shader } from "../rendersystem/shader";
import { Scene } from "../scene/scene";

export class Entity {
    public transform: Transform = new Transform();
    private _id: string;
    private _name: string;
    private _tag: string;
    private _children: Array<Entity> = new Array();
    private _components: Array<IComponent> = new Array();
    private _behaviours: Array<IBehaviour> = new Array();
    private _isLoaded: boolean = false;
    private _parent: Entity | undefined;
    private _localMatrix: Matrix4 = new Matrix4();
    private _worldMatrix: Matrix4 = new Matrix4();
    private _scene: Scene | undefined;
    private _isVisible: boolean = true;
    private _isAlive: boolean = true;
    public get children(): Array<Entity> {
        return this._children;
    }
    public get id(): string {
        return this._id;
    }
    public get isLoaded(): boolean {
        return this._isLoaded;
    }
    public set isVisible(value: boolean) {
        this._isVisible = value;
    }
    public get isVisible(): boolean {
        return this._isVisible;
    }
    public get isAlive(): boolean {
        return this._isAlive;
    }
    public set isAlive(value: boolean) {
        this._isAlive = value;
    }
    public get name(): string {
        return this._name;
    }
    public get parent(): Entity | undefined {
        return this._parent;
    }
    public get localMatrix(): Matrix4 {
        return this._localMatrix;
    }
    public get worldMatrix(): Matrix4 {
        return this._worldMatrix;
    }
    constructor({ name, tag, scene}: { name: string; tag?: string; scene?: Scene}) {
        this._id = guid();
        this._name = name;
        this._tag = (tag) ? tag : "";
        this._scene = (scene) ? scene : undefined;
    }
    public addChild(child: Entity): void {
        child.onAdded(this._scene!);
        child._parent = this;
        this._children.push(child);
    }
    public addComponent(component: IComponent): void {
        component.setOwner(this);
        this._components.push(component);
    }
    public addBehaviour(behaviour: IBehaviour): void {
        behaviour.setOwner(this);
        this._behaviours.push(behaviour);
    }
    public destroy(): void {
        this.die();
    }
    public load(): void {
        this._isLoaded = true;
        this._children.forEach((child) => {
            child.load();
        });
        this._components.forEach((component) => {
            component.load();
        });
    }
    public getBehaviourByName(name: string): IBehaviour | undefined {
        for (let b of this._behaviours) {
            if (b.name === name) return b;
        }
        for (let b of this._children) {
            let behaviour = b.getBehaviourByName(name);
            if (behaviour !== undefined) return behaviour;
        }
        return undefined;
    }
    public getComponentByName(name: string): IComponent | undefined {
        for (let c of this._components) {
            if (c.name === name) return c;
        }
        for (let c of this._children) {
            let component = c.getComponentByName(name);
            if (component !== undefined) return component;
        }
        return undefined;
    }
    public getObjectByName(name: string): Entity | undefined {
        if (this._name === name) {
            return this;
        }
        for (let child of this._children) {
            let result = child.getObjectByName(name);
            if (result !== undefined) {
                return result;
            }
        }
        console.warn(`Entity ${name} could not be found.`);
        return undefined;
    }
    public getWorldPosition(): Vector3 {
        return new Vector3(this._worldMatrix.matrix[12], this._worldMatrix.matrix[13], this._worldMatrix.matrix[14]);
    }
    public removeChild(child: Entity): void {
        let index = this._children.indexOf(child);
        if (index !== -1) {
            child._parent = undefined;
            this._children.splice(index, 1);
        }
    }
    public removeComponent(name: string): void {
        let component: IComponent | undefined = this.getComponentByName(name);
        if (component === undefined) {
            console.warn(`Component ${name} could not be found on entity ${this._name}.`);
            return;
        }
        let index = this._components.indexOf(component!);
        if (index !== -1) {
            this._components.splice(index, 1);
        }
    }
    public render(shader: Shader): void {
        if (this._isVisible) {
            this._components.forEach((component) => {
                component.render(shader);
            });
            this._children.forEach((child) => {
                child.render(shader);
            });
        }
    }
    public update(delta: number): void {
        if (this._isAlive) {
            this._localMatrix = this.transform.getTransformMatrix(); // Not fast; only run when it has changed
            this.updateWorldMatrix((this._parent !== undefined) ? this._parent.worldMatrix : undefined);
            this._components.forEach((component) => {
                component.update(delta);
            });
            this._behaviours.forEach((behaviour) => {
                behaviour.update(delta);
            });
            this._children.forEach((child) => {
                child.update(delta);
            });
        } else {
            this.die();
        }
    }
    public updateReady(): void {
        this._components.forEach((component) => {
            component.updateReady();
        });
        this._behaviours.forEach((behaviour) => {
            behaviour.updateReady();
        });
        this._children.forEach((child) => {
            child.updateReady();
        });
    }
    public unsubscribeAll(): void {
        this._components.forEach((component) => {
            Message.unsubscribeHandlerFromAll(component as unknown as IMessageHandler);
        });
        this._behaviours.forEach((behaviour) => {
            Message.unsubscribeHandlerFromAll(behaviour as unknown as IMessageHandler);
        });
        this._children.forEach((child) => {
            Message.unsubscribeHandlerFromAll(child as unknown as IMessageHandler);
            child.unsubscribeAll();
        });
    }
    protected onAdded(scene: Scene): void {
        this._scene = scene;
    }
    private die(): void {
        this._components.forEach((component) => {
            component.destroy();
        });
        this._behaviours.forEach((behaviour) => {
            behaviour.destroy();
        });
        this._children.forEach((child) => {
            child.destroy();
        });
    }
    private updateWorldMatrix(parentWorldMatrix: Matrix4 | undefined): void {
        if (parentWorldMatrix !== undefined) {
            this._worldMatrix = Matrix4.multiply(parentWorldMatrix, this._localMatrix);
        } else {
            Matrix4.copy(this._worldMatrix, this._localMatrix);
        }
    }
}