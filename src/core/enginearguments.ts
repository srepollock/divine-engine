import { DScene } from "src/rendersystem";

/** 
 * Engine arguments for setup.
 */
export class EngineArguments {
    public title: string;
    public fps: number;
    public scenes: Array<DScene> | undefined;
    public debug: boolean;
    /**
     * Engine arguments for a base setup. When defining engine parameters, using
     * this object and setting it in a project can provide quick initialization.
     * **Default arguments are defined.**
     */
    constructor({title, fps, scenes, debug}: {
            title?: string,
            fps?: number,
            scenes?: Array<DScene>,
            debug?: boolean
        } = {}
    ) {
        this.title = (title) ? title : "";
        this.fps = (fps) ? fps : 60;
        this.scenes = (scenes) ? scenes : undefined;
        this.debug = (debug) ? debug : false;
    }
    public toString(): string {
        return JSON.stringify(this);
    }
}