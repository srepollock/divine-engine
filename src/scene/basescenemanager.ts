import { DObject } from "../core/dobject";
import { Entity } from "../core/entity";
import { ErrorCode, LogCritical, LogDebug, LogError } from "../core/logging";
import { Scene } from "../core/scene";
import { SceneManager } from "./scenemanager";

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
        } else {
            this.loadScene("blankscene"); // REVIEW: This should not be hardset
        }
    }
    /**
     * Returns the Scene object.
     * @returns Scene | undefined
     */
    public getScene(): Scene {
        if (this._scene !== undefined) return this._scene;
        else {
            LogError(ErrorCode.SceneUndefined, "You gave an undefined scene to the SceneManager.scene getter.");
            throw ErrorCode.SceneUndefined;
        }
    }
    /**
     * While this says it can take undefined, it will throw a LogError saying the scene is undefined
     * @param  {Scene} scene 
     */
    public setScene(scene: Scene): void {
        if (scene !== undefined) this._scene = scene;
        else LogError(ErrorCode.SceneUndefined, "You gave an undefined scene to the SceneManager.scene setter.");
    }
    /**
     * Creates a scene with a filename and entities if defiend.
     * @param  {string} filename
     * @param  {Array<Entity>} entities?
     * @returns Scene
     */
    public buildScene(filename: string, entities?: Array<Entity>): Scene {
        if (entities !== undefined) return  new Scene(filename, entities);
        else return new Scene(filename);
    }
    /**
     * Trys to load a scene from a file. If no scene is read, throws a Critical error.
     * @param  {string} filename Full file path.
     * @returns void
     */
    public loadScene(filename: string): Scene {
        // REVIEW: This needs to read from file.
        LogDebug(`Loading scene from file ${filename}`);
        
        this._scene = this.buildSceneFromData(filename);
        LogDebug(JSON.stringify(this._scene));
        return this._scene;
        // TODO: Throws a critical error if scene not read.
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
            // tslint:disable-next-line:max-line-length
            LogCritical(ErrorCode.SceneManagerCleanupFailed, "Engine's cleanup failed. The engine did not garbage collect properly.");
        }
    }
    /**
     * Scene to unload. This is only called in this classes loadScene method.
     * @param  {string} filename
     * @returns void
     */
    public unloadScene(filename: string): Scene {
        // REVIEW: What needs to be unloaded? Should the entities be sent on from here?
        return new Scene(filename); // REVIEW: Should try to load the scene from file first.
    }
    /**
     * Builds the scene class from the JSON string. Uses Object.assign from ES6.
     * @param  {string} data A JSON stringed Scene object
     * @returns Scene
     */
    private buildSceneFromData(data: string): Scene {
        return Object.assign(new Scene(""), data);
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

