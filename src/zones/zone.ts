import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { BehaviourManager } from "../behaviours/behaviourmanager";
import { ComponentManager } from "../components/componentmanager";
import { Entity } from "../core/entity";
import { guid } from "../helper";
import { CollisionManager } from "../physicssystem";
import { Shader } from "../rendersystem/shader";
import { Scene } from "../scene/scene";
import { AudioManager } from "../soundsystem";
import { ZoneState } from "./zonestate";

export class Zone {
    private _id: string;
    private _index: number;
    private _name: string;
    private _description: string;
    private _scene: Scene;
    private _state: ZoneState = ZoneState.UNINITIALIZED;
    /**
     * Gets this zone's ID.
     * @returns string
     */
    public get id(): string {
        return this._id;
    }
    /**
     * Gets this zone's index.
     * @returns number
     */
    public get index(): number {
        return this._index;
    }
    /**
     * Gets this zone's name.
     * @returns string
     */
    public get name(): string {
        return this._name;
    }
    /**
     * Gets this zone's description.
     * @returns string
     */
    public get description(): string {
        return this._description;
    }
    /**
     * Gets this zone's scene.
     * @returns Scene
     */
    public get scene(): Scene {
        return this._scene;
    }
    /**
     * Class constructor.
     * @param  {number} index
     * @param  {string} description
     * @param  {string} name
     * *NOTE*: Zone names (in file) must match their file names up to json exactly.
     * @param param0 
     */
    constructor({ index, name, description }: { index: number, name: string; description: string; }) {
        this._id = guid();
        this._index = index;
        this._name = name;
        this._description = description;
        this._scene = new Scene();
    }
    /**
     * Initializes the zone with JSON data.
     * @param  {any} zoneData
     * @returns void
     */
    public initialize(zoneData: any): void {
        if (zoneData.objects === undefined) {
            log(LogLevel.error, `Zone initialization error: Zone has no objects data.`, ErrorCode.ZoneHasNoObjects);
        }
        (zoneData.objects as Array<Object>).forEach((obj) => {
            this.loadEntity(obj, this._scene.root);
        });
    }
    /**
     * Loads the scene and all it's entities.
     * @returns void
     */
    public load(): void {
        this._state = ZoneState.LOADING;
        this._scene.load();
        this._scene.root.updateReady();
        this._state = ZoneState.UPDATING;
    }
    /**
     * Unloads the scene.
     * @returns void
     */
    public unload(): void {
        this._scene.root.destroy();
        this._scene = new Scene();
        CollisionManager.clear();
    }
    /**
     * Calls update on the scene.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        if (this._state === ZoneState.UPDATING) {
            this._scene.update(delta);
        }
    }
    /**
     * Calls render on the scene.
     * @param  {Shader} shader
     * @returns void
     */
    public render(shader: Shader): void {
        if (this._state === ZoneState.UPDATING) {
            this._scene.render(shader);
        }
    }
    /**
     * Called when the scene is activated.
     * @returns void
     */
    public onActivated(): void {

    }
    /**
     * Called when the scene is deactivated.
     * @returns void
     */
    public onDeactivated(): void {
        this._scene.root.children.forEach((child: Entity) => {
            child.unsubscribeAll();
        });
        AudioManager.stopAll();
    }
    /**
     * Loads an entity into the scene.
     * @param  {any} dataSection
     * @param  {Entity} parent?
     * @returns void
     */
    private loadEntity(dataSection: any, parent?: Entity): void {
        let name!: string;
        if (dataSection.name === undefined) {
            log(LogLevel.error, `Zone initialization error: Object has no name.`, ErrorCode.NoName);
        } else {
            name = String(dataSection.name);
        }
        let tag!: string;
        if (dataSection.tag !== undefined) {
            tag = String(dataSection.tag);
        }
        let e: Entity = new Entity({name, tag, scene: this.scene});
        if (dataSection.transform !== undefined) {
            e.transform.setFromJson(dataSection.transform);
        }
        if (dataSection.components !== undefined) {
            (dataSection.components as Array<Object>).forEach((c: any) => {
                let component = ComponentManager.extractComponent(c);
                e.addComponent(component!);
            });
        }
        if (dataSection.behaviours !== undefined) {
            (dataSection.behaviours as Array<Object>).forEach((b: any) => {
                let behaviour = BehaviourManager.extractBehaviour(b);
                e.addBehaviour(behaviour!);
            });
        }
        if (dataSection.children !== undefined) {
            (dataSection.children as Array<Object>).forEach((c: any) => {
                this.loadEntity(c, e);
            });
        }
        if (parent !== undefined) {
            parent.addChild(e);
        }
    }
}