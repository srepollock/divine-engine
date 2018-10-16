import { Component } from "./component";
import { DObject } from "./dobject";
import { ErrorCode, LogError, LogInfo } from "./logging";

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
    private _parent?: Entity;
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
    constructor(
        tag: string = "",
        public transform: Transform = new Transform(), 
        public components: Array<Component> = new Array(),
        public children: Array<Entity> = new Array()
    ) {
        super(tag);
        this.transform = transform;
        this.components = components;
        this.children = children;
    }
    /**
     * Gets the parent entity object.
     * @returns Entity undefined if error.
     */
    public get parent(): Entity | undefined {
        if (this._parent === undefined) {
            LogError(ErrorCode.EntityParentUndefined, "${this.guid} has no \
                parent");
            return undefined;
        } else {
            return this._parent;
        }
    }
    /**
     * Sets parent object of entity.
     * @param  {Entity} entity
     */
    public setParent(entity: Entity): void {
        this._parent = entity;
    }
    /**
     * Removes the parent from the entity.
     * @returns void
     */
    public removeParent(): void {
        this._parent = undefined;
    }
    /**
     * Adds a child to the array
     * @param  {Entity} entity
     * @returns void
     */
    public addChild(entity: Entity): void {
        if (!this.hasChild(entity.guid)) {
            entity.setParent(this);
            this.children!.push(entity);
        } else {
            LogError(ErrorCode.EntityAlreadyHasChild, "${this.guid} already \
                has child ${entity.guid}");
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
        if (!this.hasComponent(component.guid)) {
            this.components!.push(component);
        } else {
            LogError(ErrorCode.EntityAlreadyHasComponent, `This entity object 
                alread has the ${component.guid} attached.`);
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
        let entity = this.children.find((e) => e.guid === id);
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
        let entity = this.children!.find((entity) => entity.guid === id);
        if (entity !== undefined) { 
            return entity!;
        } else {
            LogError(ErrorCode.EntityChildNotFound, "Component not found");
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
        let objectString = `Entity [id:${this.guid}]`;
        LogInfo(objectString);
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

