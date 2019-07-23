import { Entity } from "../core";
import { ErrorCode, log, LogLevel } from "../core";
import { DScene } from "./dscene";
export class SceneManager {
    // REVIEW: Change this to the number of the scene in the map
    private _scene: DScene;
    // REVIEW: Change this to a map
    private _scenes: Array<DScene>;
    constructor(scenes?: Array<DScene>) {
        this._scenes = new Array<DScene>();
        let tempScenes = scenes;
        if (tempScenes === undefined) {
            this._scenes.push(this.createEmptyScene());
        } else if (tempScenes.length <= 0) {
            this._scenes.push(this.createEmptyScene());
        }
        this._scene = this._scenes[0]; // Defaults to the first. Checks for save
    }
    public get scene(): DScene {
        return this._scene;
    }
    public pause(): void {

    }
    /**
     * 
     * Saves the scene the game was currently on.
     * <bold>Caution:</bold> this save is not a game save, simply the
     * save of the scene currently that can be loaded up on restart.
     * @returns void
     */
    public save(): void {

    }
    /**
     * 
     * Start should check if there was a recent or required save file bofore
     * starting from scratch.
     * @see save
     * @returns void
     */
    public start(): void {
        
    }
    public stop(): void {

    }
    public shutdown(): void {
        // TODO: Check to save here if shutdown by watch
        // if (Engine.exit == True) {
        //     this.save();
        // }
    }
    public createScene(sceneName?: string): DScene {
        return new DScene(sceneName);
    }
    public createEmptyScene(sceneName: string = "Defualt DScene Template"): DScene {
        let emptyScene: DScene = new DScene(sceneName);
        emptyScene.addEntity(new Entity({tag: "box"}));
        return emptyScene;
    }
    /**
     * Sets the current scene to a scene in the array, 
     * keeping it's place in the array as well.
     * @param  {DScene} scene
     * @returns boolean
     */
    public loadScene(name: string): boolean {
        let tempScene = this._scenes.find((scene) => {
            return scene.name === name ? scene : undefined;
        });
        if (tempScene === undefined) {
            // tslint:disable-next-line: max-line-length
            log(LogLevel.error, `Scene could not be loaded ${name}. Please load another scene or add it to the list first.`);
            return false;
        }
        this._scene = tempScene;
        log(LogLevel.debug, `Scene loaded ${JSON.stringify(this.scene)}`);
        return true;
    }
    /**
     * Adds a scene to the array of scenes in the manager.
     * @param  {DScene} scene
     * @returns boolean
     */
    public addScene(scene: DScene): boolean {
        this._scenes.push(scene);
        log(LogLevel.debug, `Scene loaded ${JSON.stringify(scene)}`);
        return this._scenes.length >= 1 ? true : false;
    }
    /**
     * Adds and array of scenes to the array of scenes in the manager.
     * Mostly used for game startup.
     * @param  {Array<DScene>} scenes
     * @returns boolean
     */
    public addScenes(scenes: Array<DScene>): boolean {
        scenes.forEach((scene) => {
            this._scenes.push(scene);
        });
        return this._scenes.length >= scenes.length ? true : false;
    }
    /**
     * Removes a scene from the list of scenes in the manager array.
     * // REVIEW: is this needed?
     * @param  {string} name
     * @returns boolean
     */
    public removeScene(name: string): boolean {
        let scene = this._scenes.filter((e) => e.name === name).shift();
        return scene !== undefined ? true : false;
    }
}