import { SceneManager } from "src/rendersystem";

/** 
 * Engine arguments for setup.
 */
export class EngineArguments {
    public title: string;
    public height: number;
    public width: number;
    public fps: number;
    public rootElementId: string;
    public sceneManager: SceneManager | undefined;
    public scene: string;
    public debug: boolean;
    /**
     * Engine arguments for a base setup. When defining engine parameters, using
     * this object and setting it in a project can provide quick initialization.
     * **Default arguments are defined.**
     * @param  {string=""} publictitle
     * @param  {number=0} publicheight
     * @param  {number=0} publicwidth
     * @param  {number=60} publicfps
     * @param  {string=""} publicrootElementId
     * @param  {boolean=false} publicdebug
     */
    constructor({title, height, width, fps, rootElementId, sceneManager, scene, debug}: {
            title?: string,
            height?: number,
            width?: number,
            fps?: number,
            rootElementId?: string,
            sceneManager?: SceneManager,
            scene?: string,
            debug?: boolean
        } = {}
    ) {
        this.title = (title) ? title : "";
        this.height = (height ? height : 0);
        this.width = (width) ? width : 0;
        this.fps = (fps) ? fps : 60;
        this.rootElementId = (rootElementId) ? rootElementId : "";
        this.sceneManager = (sceneManager) ? sceneManager : undefined;
        this.scene = (scene) ? scene : "";
        this.debug = (debug) ? debug : false;
    }
    public toString(): string {
        return JSON.stringify(`${this.title}, ${this.width}x${this.height}, ${this.fps}, ${this.sceneManager}`);
    }
}