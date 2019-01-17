import * as THREE from "three";
import { AssetManager } from "../assets";
import { DObject } from "../dobject";
import { Entity } from "../entity";
import { ErrorCode, LogCritical, LogDebug, LogError, LogWarning } from "../logging";
import { SceneManagerMessage } from "../messagesystem/messages/scenemanagermessage";
import { RenderSystem } from "../render/rendersystem";

export class SceneManager extends DObject {
    public normalMessageQueue: Array<SceneManagerMessage> = new Array();
    private _scene: THREE.Scene | undefined = undefined;
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
     * @returns DScene | undefined
     */
    public get scene(): THREE.Scene {
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
    public set scene(scene: THREE.Scene) {
        if (scene !== undefined) this._scene = scene;
        else LogError(ErrorCode.SceneUndefined, "You gave an undefined scene to the SceneManager.scene setter.");
    }
    /**
     * Creates a scene with a filename and entities if defiend.
     * @param  {string} filename
     * @param  {Array<Entity>} entities?
     * @returns DScene
     */
    public buildScene(filename: string, entities?: Array<Entity>): THREE.Scene {
        this.loadScene(filename);
        if (entities !== undefined) {
            // TODO: Load entites to scene
        } else {
            LogWarning(ErrorCode.NoEntitiesLoaded, "No entities were given to load to the scene.");
        }
        // TODO: Wait for scene to be loaded
        return RenderSystem.scene;
    }
    /**
     * Trys to load a scene from a file. If no scene is read, throws a Critical error.
     * @param  {string} filename Full file path.
     * @returns void
     */
    public async loadScene(filename: string): Promise<THREE.Scene> {
        // REVIEW: This needs to read from file.
        LogDebug(`Loading scene from file ${filename}`);
        AssetManager.loadAsset(filename);
        // REVIEW: Wait and get the scene loaded from the asset manager.
        var count: number = 0;
        var promiseSceneLoaded = (n: number): Promise<THREE.Scene> => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (RenderSystem.scene !== undefined) resolve(RenderSystem.scene);
                    else reject(`Scene not yet loaded in RenderSystem try: ${count}/5`);
                }, 500);
            });
        };
        await promiseSceneLoaded(count)
            .then(
                (result) => {
                    LogDebug(`Scene Manager loeaded scene: ${filename}.`);
                }
            ).then(
                (result) => {
                    LogDebug(`Scene Manager loeaded scene: ${filename}.`);
                },
                (error) => {
                    // tslint:disable-next-line:max-line-length
                    LogCritical(ErrorCode.SceneNotLoaded, "Scene could not be loaded in the Scene Manager. The Render system did not have it loaded.");
                }
            );
        if (this._scene === undefined) {
            // tslint:disable-next-line:max-line-length
            // NOTE: This throws.
            // tslint:disable-next-line:max-line-length
            LogCritical(ErrorCode.SceneNotLoaded, "Scene could not be loaded in the Scene Manager. The Render system did not have it loaded.");
        }
        return new Promise<THREE.Scene>(() => {
            return this._scene;
        });
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
    public async unloadScene(filename: string): Promise<THREE.Scene> {
        // REVIEW: What needs to be unloaded? Should the entities be sent on from here?
        this._scene = undefined;
        return this.loadScene(filename);
    }
    /**
     * Updates the scene.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        // TODO: Handle messages first, then update the scene
        this.normalMessageQueue.forEach((message) => {
            LogDebug(`${message.data}`);
        });
    }
    /**
     * Cleansup the class before shutdown.
     * NOTE: This function may throw an error if the scene is undefined.
     * @returns void
     */
    private cleanup(): void {
        if (this._scene !== undefined) this._scene = undefined;
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
     * @param  {DScene} scene
     * @returns void
     */
    private writeSceneToFile(scene: THREE.Scene): void {
        // REVIEW: This needs to write to file.
        // LogDebug(`Writing scene ${scene.title} to file`);
        // let sceneData = JSON.stringify(scene);
        // writeJSONFile(scene.title, sceneData);
    }
}

