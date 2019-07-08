import { ErrorCode, log, LogLevel } from "../loggingsystem/src";
import { DScene } from "./dscene";

export class SceneManager {
    private _scene: DScene;
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
        return new DScene(sceneName);
    }
    public loadScene(scene: DScene): void {
        this._scenes.push(scene);
        log(LogLevel.debug, `Scene loaded ${JSON.stringify(scene)}`);
    }
    public loadScenes(scenes: Array<DScene>): void {
        scenes.forEach((scene) => {
            this._scenes.push(scene);
        });
    }
}