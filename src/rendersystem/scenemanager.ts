import { Engine, Entity, Message, MessageType } from "../core";
import { ErrorCode, log, LogLevel } from "../core";
import { SceneManagerStream } from "../core/streams/scenemanagerstream";
import { DScene } from "./dscene";
export class SceneManager {
    public get scene(): DScene {
        return this._scene;
    }
    public messageQueue: Array<Message> = new Array<Message>();
    public sceneManagerStream: SceneManagerStream = new SceneManagerStream({messageQueueReference: this.messageQueue});
    // REVIEW: Change this to the number of the scene in the map
    private _scene: DScene;
    // REVIEW: Change this to a map
    private _scenes: Array<DScene>;
    constructor(scenes?: Array<DScene>) {
        if (scenes !== undefined) {
            this._scenes = scenes;
        } else {
            this._scenes = new Array<DScene>();
            this._scenes.push(SceneManager.createEmptyScene());
        }
        this._scene = this._scenes[0];
        this.start();
    }
    /**
     * Creates a new DScene and adds it to the end of the scene manager's scene list.
     * @param  {string} sceneName?
     * @returns DScene
     */
    public static createBasicScene(sceneName?: string): DScene {
        let scene = new DScene(sceneName);
        scene.addEntity(new Entity({tag: "box"}));
        return scene;
    }
    /**
     * Creates a new Scene with a default name. Adds the new scene to the end of the scene manager's scene list.
     * @param  {string="DefualtDSceneTemplate"} sceneName
     * @returns DScene
     */
    public static createEmptyScene(sceneName: string = "Default DScene Template"): DScene {
        let emptyScene: DScene = new DScene(sceneName);
        return emptyScene;
    }
    /**
     * 
     * Saves the scene the game was currently running and the player was on.
     * <bold>Caution:</bold> this save is not a game save, simply the
     * save of the scene currently that can be loaded up on restart.
     * 
     * // TODO: Should setup a state to save the base scenes for the game(?)
     * @returns void
     */
    public save(): void {
        this._scene.save(Engine.instance!.engineArguments.defaultSaveLocation);
    }
    /**
     * 
     * Start should check if there was a recent or required save file bofore
     * starting from scratch.
     * @see save
     * @returns void
     */
    public start(): void {
        if (!this._scene.checkSaved()) {
            this._scene.loadScene();
        } else {
            this.sendMessage(JSON.stringify({name: this._scene.name}), MessageType.Asset, true);
            // TODO: Wait for the callback.
            // this._scene.loadPreviousSave();
        }
    }
    /**
     * Save the current scene state and shutdown
     * @returns void
     */
    public shutdown(): void {
        this.save();
        this._scenes.forEach((scene) => {
            scene.shutdown();
        });
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
        this._scene.unloadScene();
        this._scene = tempScene;
        this._scene.loadScene();
        log(LogLevel.debug, `The ${this.scene.name} scene was loaded.`);
        return true;
    }
    /**
     * Adds a scene to the array of scenes in the manager.
     * @param  {DScene} scene
     * @returns boolean
     */
    public addScene(scene: DScene): boolean {
        this._scenes.push(scene);
        log(LogLevel.debug, `The ${this._scene.name} was added`);
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
            log(LogLevel.debug, `The ${this._scene.name} was added`);
        });
        return this._scenes.length >= scenes.length ? true : false;
    }
    /**
     * Sets the next scene in the list to active.
     * @returns boolean
     */
    public nextScene(): boolean {
        let tempIndex = this._scenes.indexOf(this._scene);
        if (tempIndex === -1) {
            log(LogLevel.error, `Next scene could not be loaded, please select a different scene.`, 
                ErrorCode.SceneNotFound);
            return false;
        }
        this.loadScene(this._scenes[++tempIndex].name);
        return true;
    }
    /**
     * DObjects base messasge handler receiving messages.
     * This can and most likely will be rewritten.
     * @param  {Message} message
     * @returns void
     */
    public onMessge(message: Message): void {
        // public onMessage(type: MessageType, callback: () => {}): void {
        // REVIEW:
        // Should this be called on update?
        log(LogLevel.debug, `SceneManager receiving: ${message.toString()}`);
    }
    public previousScene(): boolean {
        let tempIndex = this._scenes.indexOf(this._scene);
        if (tempIndex === -1) {
            log(LogLevel.error, `Next scene could not be loaded, please select a different scene.`, 
                ErrorCode.SceneNotFound);
            return false;
        }
        this.loadScene(this._scenes[--tempIndex].name);
        return true;
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
    /**
     * Sends a message to the engine stream.
     * @param  {string} data
     * @param  {MessageType} type
     * @param  {boolean} single?
     * @returns void
     */
    public sendMessage(data: string, type: MessageType, single?: boolean): void {
        this.sceneManagerStream.write(new Message(data, type, single));
    }
}