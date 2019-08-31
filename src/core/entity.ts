import * as three from "three";
import { Component } from "../components/component";
import { Vector3 } from "../math";
import { DObject } from "./dobject";
import { ErrorCode, log, LogLevel } from "./loggingsystem/src";
import { Message, MessageType } from "./messagesystem/src";

/**
 * The Divine's entity object for game objects. The engine uses a Scene->
 * Entity->Component system for all game objects for easy object manipulation
 * and game object creation.
 */
export class Entity extends DObject {
    public name: string;
    public components: Array<Component>;
    public children: Array<Entity>;
    public transform: Vector3;
    private _geometry?: three.Geometry | undefined;
    private _mesh?: three.Mesh | undefined;
    private _material?: three.Material | undefined;
    private _parent: string;
    private _ready: boolean = false;
    private _sprite?: three.Sprite | undefined;
    private _texture?: three.Texture | undefined;
    /**
     * Gets if the entity is ready to render or not.
     * @returns boolean
     */
    public get ready(): boolean {
        return this._ready;
    }
    /**
     * Gets the mesh from the class. Check if this is undefined before using.
     * 
     * Use in 3D Games.
     * @returns Mesh
     */
    public get mesh(): three.Mesh | undefined {
        return this._mesh;
    }
    /**
     * Gets the sprite from the class. Check if this is undefined before using.
     * 
     * Use in 2D games.
     * @returns Sprite
     */
    public get sprite(): three.Sprite | undefined {
        return this._sprite;
    }
    /**
     * Entity constructor
     * @param {string} name
     * @param {string} tag
     * @param {Vector3} transform
     * @param {three.Geometry|three.BoxGeometry|three.SphereGeometry} geometry
     * @param {three.Material|three.MeshBasicMaterial|three.SpriteMaterial} material
     * @param {Array<Component>} components Entities components as an array attached to the object.
     * These can be engine default components or user defined components. 
     * Any new component that derives from the base Component class can be used 
     * here.
     * @see Component
     * @param {Array<Entity>} children Entities child objects as there can be children attached 
     * to the entity.
     * @param {parent} parent
     */
    constructor({name, tag, transform, geometry, material, sprite, texture, components, children, parent}: {
        name?: string,
        tag?: string,
        transform?: Vector3,
        geometry?: three.Geometry | three.BoxGeometry | three.SphereGeometry,
        material?: three.Material | three.MeshBasicMaterial | three.SpriteMaterial,
        sprite?: three.Sprite,
        texture?: string,
        components?: Array<Component>,
        parent?: Entity,
        children?: Array<Entity>
    } = {}) {
        super(tag);
        this.name = (name) ? name : `${this.tag + " " + this.id}`;
        this.transform = (transform) ? transform : new Vector3();
        this.determineRenderObjects(geometry, sprite, material, texture);
        this.components = (components) ? components : new Array();
        log(LogLevel.debug, `Setting parent of ${this.id} to ${parent}`);
        this._parent = (parent) ? parent.id : "";
        this.children = (children) ? children : new Array();
        for (let i in this.children) {
            this.children[i].setParent(this);
        }
        if ((this._geometry && this._material) || (this._texture && this._material && this._sprite)) {
            this._ready = true;
        }
    }
    /**
     * Gets the parent object's ID.
     * @returns (parent object's ID | "")
     */
    public get parent(): string {
        if (this._parent !== "") return this._parent;
        log(LogLevel.error, `You tried to get the parent of ${this.id} that has no parent`, 
            ErrorCode.EntityParentUndefined);
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
            log(LogLevel.error, `${this.id} already has child ${entity.id}`, ErrorCode.EntityAlreadyHasChild);
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
        if (!this.hasComponent(component.tag)) {
            this.components!.push(component);
        } else {
            // tslint:disable-next-line:max-line-length
            log(LogLevel.error, `This entity object alread has the ${component.id} attached.`, ErrorCode.EntityAlreadyHasComponent);
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
     * Called on the entity to add it to the scene. This will handle 2D or 3D, but it's called within the DScene.
     * @see DScene
     * @returns any
     */
    public addToScene(): three.Sprite | three.Mesh {
        if (this._sprite && !this._geometry) {
            return this._sprite!;
        } else {
            return this._mesh!;
        }
    }
    /**
     * 
     * @override DObject.asMessage
     * @returns string
     */
    public asMessage(): string {
        
        let message: string = "";
        message += this.name;
        this.components.forEach((component) => {
            message += component.asMessage();
        });
        message += this.children;
        message += this.transform;
        message += this._geometry;
        message += this._mesh;
        message += this._material;
        message += this._parent;
        message += this._ready;
        message += this._sprite;
        message += this._texture!.toString();
        return message;
    }
    /**
     * Checks if the entity has the child or not.
     * @param  {string} id Entity unique id
     * @returns boolean
     */
    public hasChild(id: string): boolean {
        // https://stackoverflow.com/questions/46348749/ts-property-find-does-not-exist-on-type-myarray
        // let entity = this.children.find((e) => e.id === id);
        let entity = this.children.filter((e) => e.id === id).shift();
        if (entity !== undefined) return true;
        else return false;
    }
    /**
     * Checks if the entity has the component or not.
     * REVIEW: This should be searching by ID
     * @param  {string} type Component tag name
     * @returns boolean
     */
    public hasComponent(type: string): boolean {
        let comp = this.components!.filter((comp) => comp.tag! === type).shift();
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
        let entity = this.children!.filter((entity) => entity.id === id).shift();
        if (entity !== undefined) { 
            return entity!;
        } else {
            log(LogLevel.warning, `Child ${id} not found`, ErrorCode.EntityChildNotFound);
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
     * @returns Component | undefined
     */
    public getComponent(type: string): Component | undefined {
        let comp = this.components!.filter((comp) => comp.tag! === type).shift();
        if (comp !== undefined) { 
            return comp!;
        } else {
            log(LogLevel.warning, "Component not found", ErrorCode.EntityComponentNotFound);
            return undefined;
        }
    }
    /**
     * Returns the object as a string.
     * @returns string
     */
    public toString(): string {
        let objectString = `Entity [id:${this.id}]`;
        log(LogLevel.debug, objectString);
        return objectString;
    }
    /**
     * Udpates the current object
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        this.messageQueue.forEach((element) => {
            this.onMessage(element);
        });
        this.messageQueue = new Array<Message>();
    }
    /**
     * Entity message handler. This is how the Entity class handles the messages from the system.
     * @override DObject.onMessage
     * @param  {Message} message
     * @returns void
     */
    public onMessage(message: Message): void {
        let data = JSON.parse(message.data);
        switch (message.type) {
            case MessageType.Asset:
                if (data.id === this.id && data.texture) {
                    this.updateSprite(data.texture);
                }
                break;
            default:
                log(LogLevel.debug, `Entity.${this.id} discarded a message`);
                break;
        }
    }
    /**
     * Determines what to set the rendering objects to.
     * The RenderSystem handles which is used for rendering.
     * @param  {three.Geometry|three.BoxGeometry|three.SphereGeometry|undefined} geometry
     * @param  {three.Sprite|undefined} sprite
     * @param  {three.Material|three.MeshBasicMaterial|three.SpriteMaterial|undefined} material
     * @param  {string|undefined} texture
     * @returns void
     */
    private determineRenderObjects(
        geometry: three.Geometry | three.BoxGeometry | three.SphereGeometry | undefined, 
        sprite: three.Sprite | undefined, 
        material: three.Material | three.MeshBasicMaterial | three.SpriteMaterial | undefined, 
        texture: string | undefined): void {
        if (geometry !== undefined && sprite !== undefined) {
            log(LogLevel.warning, 
                `Both Geometry and Sprite cannot be defined for the same object. Defaulting to default sprite.`);
            this._texture = new three.Texture();
            this._material = new three.SpriteMaterial({ map: this._texture, color: 0xffffff });
            this._sprite = new three.Sprite(this._material as three.SpriteMaterial);
        } else if (!geometry && (sprite || material || texture)) {
            this.sendMessage(JSON.stringify({ id: this.id, url: texture }), MessageType.IO, true);
        } else if ((geometry || material) && !sprite) {
            this._geometry = (geometry) ? geometry : new three.BoxGeometry(1, 1, 1);
            this._material = (material) ? material : new three.MeshBasicMaterial({ color: 0xff0000 });
            this._mesh = new three.Mesh(this._geometry, this._material);
        } else {
            log(LogLevel.warning, `Entity was not given a sprite or geometry. Creating default sprite.`);
            this._texture = new three.Texture();
            this._material = new three.SpriteMaterial({ map: this._texture, color: 0xffffff });
            this._sprite = new three.Sprite(this._material as three.SpriteMaterial);
        }
    }
    /**
     * Updates the Sprite for the Entity. Called when the message is sent to the Entity containing texture data.
     * @param  {three.Texture} texture
     */
    private updateSprite(texture: three.Texture): void {
        this._texture = (texture) ? texture : new three.Texture();
        this._material = new three.SpriteMaterial({ map: this._texture, color: 0xffffff });
        this._sprite = new three.Sprite(this._material as three.SpriteMaterial);
        this._ready = true; // NOTE: Texture finally loaded on a Sprite Entity
    }
}