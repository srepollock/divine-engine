import { DObject } from "./dobject";
import { Entity } from "./entity";
import { ErrorCode, LogCritical, LogError } from "./logging";
import { Scene } from "./scene";

export interface SceneManager {
    buildScene(entities?: Array<Entity>, filename?: string): Scene;
    loadScene(filename: string): Scene;
    shutdown(): void;
    getScene(): Scene;
    setScene(scene: Scene): void;
    unloadScene(filename: string): void;
}

// REVIEW: Should this be an interface and have a class that is the MainSceneManager?
export class BaseSceneManager extends DObject implements SceneManager {
    private _scene: Scene | undefined = undefined;
    /**
     * Load scene 
     * @param  {string} filename?
     */
    constructor(filename?: string) {
        super("scenemanager");
        if (filename !== undefined) {
            this.loadScene(filename);
        }
    }
    /**
     * Returns the Scene object.
     * @returns Scene | undefined
     */
    public getScene(): Scene {
        if (this._scene !== undefined) return this._scene;
        else {
            LogError(ErrorCode.SceneUndefined, "You gave an undefined scene to the SceneManager.scene setter.");
            throw ErrorCode.SceneUndefined;
        }
    }
    /**
     * While this says it can take undefined, it will throw a LogError saying the scene is undefined
     * @param  {Scene} scene 
     */
    public setScene(scene: Scene) {
        if (scene !== undefined) this._scene = scene;
        else LogError(ErrorCode.SceneUndefined, "You gave an undefined scene to the SceneManager.scene setter.");
    }
    /**
     * Creates a scene from a list of entities. If a filename is specified the scene will be written to a file.
     * @param  {Array<Entity>} entities?
     * @returns Scene
     */
    public buildScene(entities?: Array<Entity>, filename?: string): Scene {
        var scene: Scene;
        if (entities !== undefined) scene = new Scene(entities);
        else { scene = new Scene(); }
        if (filename !== undefined ) { this.writeSceneToFile(scene); }
        return scene;
    }
    /**
     * Scene to load
     * NOTE: SCENE NAMES MUST BE THE SAME AS THE FILENAMES
     * @param  {string} filename Name of the scene.
     * @returns void
     */
    public loadScene(filename: string): Scene {
        // REVIEW: This needs to read from file.
        // LogDebug(`Loading scene from file ${filename}`);
        // this._scene = this.buildSceneFromData();
        // Log(JSON.stringify(this._scene));
        // return this._scene;
        return new Scene(); // DEBUG: This should not be a new Scene but one loaded from file.
    }
    /**
     * Calls this classes clenaup funciton. Shutsdown the class. Called on Engine shutdown.
     * // NOTE: This function may throw an error
     * @returns void
     */
    public shutdown(): void {
        try {
            this.cleanup();
        } catch (e) {
            console.trace(e);
            throw new Error(`${ErrorCode.SceneUndefined}`);
        }
    }
    /**
     * Scene to unload. This is only called in this classes loadScene method.
     * @param  {string} filename
     * @returns void
     */
    public unloadScene(filename: string): void {
        // REVIEW: What needs to be unloaded? Should the entities be sent on from here?
    }
    /**
     * Builds the scene class from the JSON string. Uses Object.assign from ES6.
     * @param  {string} data A JSON stringed Scene object
     * @returns Scene
     */
    private buildSceneFromData(data: string): Scene {
        return Object.assign(new Scene(), data);
    }
    /**
     * Cleansup the class before shutdown.
     * NOTE: This function may throw an error if the scene is undefined.
     * @returns void
     */
    private cleanup(): void {
        if (this._scene !== undefined) this._scene.shutdown();
        else {
            LogCritical(ErrorCode.SceneUndefined, "Scene is undfined on BaseSceneManager.cleanup");
            throw new Error(`${ErrorCode.SceneUndefined}`);
        }
    }
    /**
     * Writes the given scene to a file.
     * The filename will be set as the scene's title.
     * The file will be written as a JSON object using writeJSONFile(filename, data)
     * File writes default to the an asset folder in the same directory as the process's start
     * @param  {Scene} scene
     * @returns void
     */
    private writeSceneToFile(scene: Scene): void {
        // REVIEW: This needs to write to file.
        // LogDebug(`Writing scene ${scene.title} to file`);
        // let sceneData = JSON.stringify(scene);
        // writeJSONFile(scene.title, sceneData);
    }
}

