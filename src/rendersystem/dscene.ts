import { MessageType } from "src/core";
import { PointLight, Scene } from "three";
import { DObject } from "../core/dobject";
import { Entity } from "../core/entity";
import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";

export class DScene extends DObject {
    private _active: boolean = false;
    private _entities: Array<Entity> = new Array<Entity>();
    private _name: string;
    private _ready: boolean = false;
    private _scene: Scene;
    /**
     * Gets if the scene is active or not.
     * @returns boolean
     */
    public get active(): boolean {
        return this._active;
    }
    /**
     * Sets the scene to active or not.
     * @param  {boolean} active
     */
    public set active(active: boolean) {
        this._active = active;
    }
    /**
     * Gets the name of the DScene.
     * @returns string
     */
    public get name(): string {
        return this._name;
    }
    public get ready(): boolean {
        return this._ready;
    }
    /**
     * Gets the ThreeJS scene to render.
     * @returns Scene
     */
    public get threeScene(): Scene {
        return this._scene;
    }
    constructor(name: string = "Divine Engine Scene", entities?: Array<Entity>) {
        super("scene");
        this._name = name;
        this._scene = new Scene();
        this._scene.add(new PointLight(0xffffff)); // REVIEW: Is this necessary?
        if (entities !== undefined) {
            log(LogLevel.debug, `Adding entities to the scene.`);
            this._entities = entities as Array<Entity>;
        }
        this.checkReady();
    }
    /**
     * Loads the previously saved file. This is in conjunction with the MessageSystem and IOSystem to read and send the 
     * file data.
     * @see MessageSystem
     * @see IOSystem
     * @param {string} scene
     * @returns boolean
     */
    public static loadPreviousSave(jsonScene: string): DScene {
        let scene: DScene = Object.assign(new DScene(), JSON.parse(jsonScene));
        scene._scene = Object.assign(new Scene(), scene._scene);
        let tempEntities: Array<Entity> = new Array<Entity>();
        scene._entities.forEach((entity) => {
            tempEntities.push(Object.assign(new Entity(), entity));
        });
        scene._entities = tempEntities;
        return scene;
    }
    /**
     * Adds an entity to the Scene list.
     * @param  {Entity} entity
     * @returns void
     */
    public addEntity(entity: Entity): boolean {
        // TODO: Check if the entity is already part of the scene.
        if (this._entities.filter((e) => e.id === entity.id).shift()) {
            log(LogLevel.warning, `Entity ${entity.name}.${entity.id} already exists in the scene. You cannot have two` 
                + `of the exact same entities in the scene.`);
            return false;
        }
        return this._entities.push(entity) > 0;
    }
    /**
     * Returns this object as a JSON string to send in messages.
     * @returns string
     */
    public asMessage(): string {
        return JSON.stringify(this);
    }
    /**
     * Check if this scene has a previously saved state.
     * @returns boolean
     */
    public checkSaved(): boolean {
        let previouslySaved: boolean = false;
        // TODO: Check the file with the MessageSystem and IOSystem.
        return previouslySaved;
    }
    /**
     * Gets all the Entities in this scene.
     * @returns Array
     */
    public getSceneEntities(): Array<Entity> {
        return this._entities;
    }
    /**
     * Adds all the entities to the ThreeJS scene.
     * @returns boolean
     */
    public loadScene(): boolean {
        this._active = true;
        if (this._active) {
            this._entities.forEach((entity) => {
                (this._scene as Scene).add(entity.addToScene());
            });
            return this.checkReady();
        }
        log(LogLevel.error, `The ${this._name} scene is not active and cannot be loaded.`, ErrorCode.SceneNotActive);
        return false;
    }
    /**
     * Saves the current state of the scene. This should only be called on the current scene from the scene manager.
     * @returns boolean
     */
    public save(path: string): void {
        let sceneData: string = this.asMessage();
        // write the stuff with fs.write in the IOSystem
        // 1. Save the file yyyymmdd_{scene.title}.des (Divine Engine Scene)
        // By default it overwrites the scene if there is a previous save.
        let date = `${new Date().getFullYear}${new Date().getMonth}${new Date().getDate}`;
        let filename: string = `${date}_${this._name}.des`;
        this.sendMessage(JSON.stringify({path, data: sceneData, filename}), MessageType.IO, true);
        // 2. Check if the save went ok, else try one more time then throw a fail and return false.
        // This is checked in the update // TODO: add an update function here, chains to scenemanager update.
    }
    /**
     * Called when the game is shutting down. Saves the data to a disk space.
     * 
     * // REVIEW: This should be specified in EngineArguments?
     * @returns void
     */
    public shutdown(): void {
        this.cleanup();
    }
    /**
     * Unloads the ThreeJS scene from the system.
     * @returns boolean
     */
    public unloadScene(): boolean {
        if (!this._active) {
            log(LogLevel.warning, `The scene was not active and does not need to be unloaded.`);
            return false;
        }
        this._scene = new Scene();
        this._active = false;
        return true;
    }
    /**
     * Cleanups all elements of the scene.
     * @returns void
     */
    private cleanup(): void {
        this._entities.length = 0; // Cleans the array. (Fastest method I've found)
    }
    /**
     * Checks if the scene is loaded and ready.
     * @returns boolean
     */
    private checkReady(): boolean {
        let time: number = Date.now();
        while (!this._ready) {
            if (time > time + 10000) {
                log(LogLevel.critical, "The scene took too long to load, please debug and try again.", 
                    ErrorCode.SceneTimedOut);
                break;
            }
            let count: number = 0;
            this._entities.forEach((entity) => {
                if (entity.ready) {
                    return count++;
                }
            });
            if (count === this._entities.length) {
                this._ready = true;
            }
            let percentage = ((count / this._entities.length) * 100) ? (count / this._entities.length) * 100 : 100;
            log(LogLevel.info, `Loading scene ${this._name}: ${percentage}%`);
        }
        log(LogLevel.debug, `The ${this.name} is ready.`);
        return this._ready;
    }
}