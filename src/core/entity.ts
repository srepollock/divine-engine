import { Component } from "../core/components/component";
import { DObject } from "./dobject";
import { ErrorCode, Log, LogDebug, LogError, LogWarning } from "./logging";

/**
 * The entity objects position.
 */
export class Transform {
    /**
     * Transform constructor
     * @param x x world position
     * @param y y world positon
     */
    constructor(public x: number = 0, public y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

/**
 * The Daemon's entity object for game objects. The engine uses an
 * Entity->Component system for all game objects for easy object manipulation
 * and game object creation.
 */
export class Entity extends DObject {
    public transform: Transform;
    public components: Array<Component>;
    public children: Array<Entity>;
    private _parent: string;
    /**
     * Entity constructor
     * @param id Entity's id for object uniqueness. Defaults to "".
     * @param transform Entities transform or world position.
     * @param children Entities child objects as there can be children attached 
     * to the entity.
     * @param components Entities components as an array attached to the object.
     * These can be engine default components or user defined components. 
     * Any new component that derives from the base Component class can be used 
     * here.
     * @see Component
     */
    constructor({tag, transform, components, parent, children}: {
        tag?: string,
        transform?: Transform, 
        components?: Array<Component>,
        parent?: Entity,
        children?: Array<Entity>
    } = {}) {
        super(tag);
        this.transform = (transform) ? transform : new Transform();
        this.components = (components) ? components : new Array();
        LogDebug(`Setting parent of ${this.id} to ${parent}`);
        this._parent = (parent) ? parent.id : "";
        this.children = (children) ? children : new Array();
        for (let i in this.children) this.children[i].setParent(this);
    }
    /**
     * Gets the parent object's ID.
     * @returns (parent object's ID | "")
     */
    public get parent(): string {
        if (this._parent !== "") return this._parent;
        LogError(ErrorCode.EntityParentUndefined, `You tried to get the parent of ${this.id} that has no parent`);
        return "";
    }
    /**
     * Sets parent object of entity.
     * @param  {Entity} entity
     */
    public setParent(entity: Entity): void {
        this._parent = entity.id;
    }
    /**
     * Removes the parent from the entity.
     * @returns void
     */
    public removeParent(): void {
        this._parent = "";
    }
    /**
     * Adds a child to the array
     * @param  {Entity} entity
     * @returns void
     */
    public addChild(entity: Entity): void {
        if (!this.hasChild(entity.id)) {
            entity.setParent(this);
            this.children!.push(entity);
        } else {
            LogError(ErrorCode.EntityAlreadyHasChild, `${this.id} already has child ${entity.id}`);
        }
    }
    /**
     * Add multiple children to the object.
     * @param  {Array<Entity>} entities
     * @returns void
     */
    public addChildren(entities: Array<Entity>): void {
        entities.forEach((entity) => {
            this.addChild(entity);
        });
    }
    /**
     * Add a component to the entity. There can only be one instance of a 
     * component type on the object at one time. This will log an error if
     * there is a breach of this rule.
     * @param  {Component} component The component to be added.
     * @returns void
     */
    public addComponent(component: Component): void {
        /**
         * TODO: Currently you can only have 1 type of a component on the object
         * at a time. I would like to change the entity.components list to a map
         * instead and then have multiple objects. This will make indexing a bit
         * different as well when calling Entity.hasComponent() as it will be 
         * looking at the key and not the the exact object per se. There will
         * have to be some sort of indexing on the object if this is the case 
         * or there needs to be another identifier on the object?
         */
        if (!this.hasComponent(component.id)) {
            this.components!.push(component);
        } else {
            // tslint:disable-next-line:max-line-length
            LogError(ErrorCode.EntityAlreadyHasComponent, `This entity object alread has the ${component.id} attached.`);
        }
    }
    /**
     * Add multiple components as an array to the entity object.
     * @param  {Array<Component>} ...components
     */
    public addComponents(components: Array<Component>): void {
        for (let comp of components) {
            this.addComponent(comp);
            // this.components!.push(comp);
        }
    }
    /**
     * Checks if the entity has the child or not.
     * @param  {string} id Entity unique id
     * @returns boolean
     */
    public hasChild(id: string): boolean {
        let entity = this.children.find((e) => e.id === id);
        if (entity !== undefined) return true;
        else return false;
    }
    /**
     * Checks if the entity has the component or not.
     * @param  {string} type Component class name
     * @returns boolean
     */
    public hasComponent(type: string): boolean {
        let comp = this.components!.find((comp) => comp.tag! === type);
        if (comp !== undefined) return true;
        else return false;
    }
    /**
     * Gets child entity from children.
     * TODO: This should be handled in hasChild(string). There needs to be 
     * another way of doing this.
     * @param  {string} id
     * @returns Entity
     */
    public getChild(id: string): Entity | undefined {
        let entity = this.children!.find((entity) => entity.id === id);
        if (entity !== undefined) { 
            return entity!;
        } else {
            LogWarning(ErrorCode.EntityChildNotFound, "Component not found");
            return undefined;
        }
    }
    /**
     * Gets all the children from the object.
     * @returns Array
     */
    public getChildren(): Array<Entity> {
        return this.children;
    }
    /**
     * Gets the component named that is attached to the entity.
     * @param  {string} type
     * @returns Component
     */
    public getComponent(type: string): Component | undefined {
        let comp = this.components!.find((comp) => comp.tag! === type);
        if (comp !== undefined) { 
            return comp!;
        } else {
            LogError(ErrorCode.EntityComponentNotFound, "Component not found");
            return undefined;
        }
    }
    /**
     * Returns the object as a string.
     * @returns string
     */
    public toString(): string {
        let objectString = `Entity [id:${this.id}]`;
        Log(objectString);
        return objectString;
    }
    /**
     * Udpates the current object
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        
    }
}

