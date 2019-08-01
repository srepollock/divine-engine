import { DObject } from "../core/dobject";
import { Entity } from "../core/entity";
import { log, LogLevel } from "../core/loggingsystem/src";
import { Scene } from "three";

export class DScene extends DObject {
    private _entities: Array<Entity> = new Array<Entity>();
    private _name: string;
    private _scene: Scene;
    /**
     * Gets the name of the DScene.
     * @returns string
     */
    public get name(): string {
        return this._name;
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
        if (entities !== undefined) {
            log(LogLevel.debug, `Loading entities into scene.`);
            entities.forEach((entity: Entity) => {
                this.addEntity(entity);
            });
        }
        this._scene = new Scene();
    }
    /**
     * Adds an entity to the Scene list and the ThreeJS scene to be rendered out.
     * @param  {Entity} entity
     * @returns void
     */
    public addEntity(entity: Entity): void {
        this._entities.push(entity);
    }
    /**
     * Gets all the Entities in this scene.
     * @returns Array
     */
    public getSceneEntities(): Array<Entity> {
        return this._entities;
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
        // TODO: Check the file with fs.
        return previouslySaved;
    }
    /**
     * Loads the previously saved file.
     * @returns boolean
     */
    public loadPreviousSave(): DScene {
        // TODO: Load the scene and return;
        return new DScene(); // REVIEW: This is incorrect, just used for testing.
    }
    /**
     * Saves the current state of the scene. This should only be called on the current scene from the scene manager.
     * @returns boolean
     */
    public save(): boolean {
        let saveOK: boolean = false;
        // TODO: This is where the scene saves the data to a JSON file.
        let sceneData = this.asMessage();
        // write the stuff with fs.write.
        // 1. this.CheckSaved() (remove and write)
        // 2. Save the file yyyymmdd_{scene.title}.des (Divine Engine Scene)
        // 3. Check if the save went ok, else try one more time then throw a fail and return false.
        return saveOK;
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
     * Cleanups all elements of the scene.
     * @returns void
     */
    private cleanup(): void {
        this._entities.length = 0; // Cleans the array. (Fastest method I've found)
    }
}