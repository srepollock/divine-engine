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
    /**
     * Gets the children of the entity object.
     * @returns Array
     */
    public get children(): Array<Entity> {
        return this._children;
    }
    /**
     * Gets the unique id of the object.
     * @returns string
     */
    public get id(): string {
        return this._id;
    }
    /**
     * Gets if the object is loaded.
     * @returns boolean
     */
    public get isLoaded(): boolean {
        return this._isLoaded;
    }
    /**
     * Sets if the object is visible.
     * @param  {boolean} value
     */
    public set isVisible(value: boolean) {
        this._isVisible = value;
    }
    /**
     * Gets if the object is visible.
     * @returns boolean
     */
    public get isVisible(): boolean {
        return this._isVisible;
    }
    /**
     * Gets if the object is alive.
     * @returns boolean
     */
    public get isAlive(): boolean {
        return this._isAlive;
    }
    /**
     * Sets if the object is alive.
     * @param  {boolean} value
     */
    public set isAlive(value: boolean) {
        this._isAlive = value;
    }
    /**
     * Gets the name of the entity.
     * @returns string
     */
    public get name(): string {
        return this._name;
    }
    /**
     * Gets the parent object of the entity or undefined if no parent.
     * @returns Entity
     */
    public get parent(): Entity | undefined {
        return this._parent;
    }
    /**
     * Gets the location matrix of the entity based on the transform.
     * @returns Matrix4
     */
    public get localMatrix(): Matrix4 {
        return this._localMatrix;
    }
    /**
     * Gets the world matrix of the entity, based on the parent matrix.
     * @returns Matrix4
     */
    public get worldMatrix(): Matrix4 {
        return this._worldMatrix;
    }
    /**
     * Class constructor.
     * @param  {string} name
     * @param  {string} tag
     * @param  {Scene} scene
     */
    constructor({ name, tag, scene}: { name: string; tag?: string; scene?: Scene}) {
        this._id = guid();
        this._name = name;
        this._tag = (tag) ? tag : "";
        this._scene = (scene) ? scene : undefined;
    }
    /**
     * Adds a child entity to the current entity.
     * @param  {Entity} child
     * @returns void
     */
    public addChild(child: Entity): void {
        child.onAdded(this._scene!);
        child._parent = this;
        this._children.push(child);
    }
    /**
     * Adds a component to the entity.
     * @param  {IComponent} component
     * @returns void
     */
    public addComponent(component: IComponent): void {
        component.setOwner(this);
        this._components.push(component);
    }
    /**
     * Adds a behaviour to the entity.
     * @param  {IBehaviour} behaviour
     * @returns void
     */
    public addBehaviour(behaviour: IBehaviour): void {
        behaviour.setOwner(this);
        this._behaviours.push(behaviour);
    }
    /**
     * Destroys the entity.
     * @returns void
     */
    public destroy(): void {
        this.die();
    }
    /**
     * Loads the entity and it's components.
     * @returns void
     */
    public load(): void {
        this._isLoaded = true;
        this._children.forEach((child) => {
            child.load();
        });
        this._components.forEach((component) => {
            component.load();
        });
    }
    /**
     * Gets the behavoiur by name from the entity.
     * @param  {string} name
     * @returns IBehaviour
     */
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
    /**
     * Gets the component by name from the entity.
     * @param  {string} name
     * @returns IComponent
     */
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
    /**
     * Gets the child entity by name from the entity.
     * @param  {string} name
     * @returns Entity
     */
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
    /**
     * Gets the position relative to the world of the object.
     * @returns Vector3
     */
    public getWorldPosition(): Vector3 {
        return new Vector3(this._worldMatrix.matrix[12], this._worldMatrix.matrix[13], this._worldMatrix.matrix[14]);
    }
    /**
     * Removes the child entity from the entity.
     * //REVIEW: change this to by name?
     * @param  {Entity} child
     * @returns void
     */
    public removeChild(child: Entity): void {
        let index = this._children.indexOf(child);
        if (index !== -1) {
            child._parent = undefined;
            this._children.splice(index, 1);
        }
    }
    /**
     * Removes the component by name.
     * @param  {string} name
     * @returns void
     */
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
    /**
     * Renders the entity, components and all children recursively.
     * @param  {Shader} shader
     * @returns void
     */
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
    /**
     * Updates the entity by delta and recursively called on components, behaviours and children.
     * @param  {number} delta
     * @returns void
     */
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
    /**
     * Checks if the components, behaviours and children is ready.
     * @returns void
     */
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
    /**
     * Unsubscribe the components, behaviours and children from all message types.
     * @returns void
     */
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
    /**
     * Adds the scene to the entity.
     * @param  {Scene} scene
     * @returns void
     */
    protected onAdded(scene: Scene): void {
        this._scene = scene;
    }
    /**
     * Kills the entity, components, behaviours and children recursively.
     * @returns void
     */
    private die(): void {
        this._isAlive = false;
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
    /**
     * Updates the world matrix based on the parent matrix and the local matrix.
     * @param  {Matrix4|undefined} parentWorldMatrix
     * @returns void
     */
    private updateWorldMatrix(parentWorldMatrix: Matrix4 | undefined): void {
        if (parentWorldMatrix !== undefined) {
            this._worldMatrix = Matrix4.multiply(parentWorldMatrix, this._localMatrix);
        } else {
            Matrix4.copy(this._worldMatrix, this._localMatrix);
        }
    }
}