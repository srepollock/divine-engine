import { Engine as BEngine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { Engine } from "../engine";
import { Client } from "../helper";
import { ErrorCode, log, LogLevel } from "../loggingsystem/src";
import { System } from "../system";
import { SceneManager } from "./scenemanager";
export class RenderSystem extends System {
    private _canvas: HTMLCanvasElement;
    private _engine: BEngine;
    private _sceneManager: SceneManager;
    // public scene: THREE.Scene | undefined;
    // public geometry: THREE.Geometry | undefined;
    // public material: THREE.Material | undefined;
    // public mesh: THREE.Mesh | undefined;
    // public renderer: THREE.WebGLRenderer | undefined;
    /**
     * Render system constructor.
     * @param  {number} width
     * @param  {number} height
     */
    private constructor({ width, height, canvas, scenes, sceneManager }: {
        width?: number, height?: number,
        canvas?: HTMLCanvasElement, engine?: BEngine, scenes?: Array<Scene>,
        sceneManager?: SceneManager
    } = {}) {
        super("rendersystem");
        if (canvas === undefined) {
            log(LogLevel.critical, "No canvas element was given to the render engine.", ErrorCode.CanvasNotDefined);
        }
        this._canvas = canvas!;
        this._engine = new BEngine(this._canvas!);
        if (sceneManager === undefined) {
            // TODO: Personal Scene manager to be added here
            this._sceneManager = new SceneManager(this._engine, scenes);
        } else if (scenes !== undefined) {
            this._sceneManager = sceneManager;
            sceneManager.loadScenes(scenes);
        } else {
            this._sceneManager = sceneManager;
            this._sceneManager.createEmptyScene(this._canvas, this._engine);
        }
        // if (Engine.instance!.client === Client.Browser) { // NOTE: For Version 1 of the engine, focus on this

        // } else if (Engine.instance!.client === Client.Electron) {

        // } else {
        //     // Console running
        // }
    }
    /**
     * @returns void
     * @override
     */
    public cleanup(): void {
        // TODO: Cleanup anything that is not necessary
    }
    /**
     * Initializes the system.
     * @returns void
     */
    public initialize({ width, height, canvas, scenes, sceneManager }: {
        width?: number, height?: number,
        canvas?: HTMLCanvasElement, engine?: BEngine, scenes?: Array<Scene>,
        sceneManager?: SceneManager
    } = {}): void {
    }
    public shutdown(): void {
        this.cleanup();
    }
    /**
     * Render system start method.
     * @returns void
     */
    public start(): void {

    }
    public stop(): void {

    }
    public update(delta: number): void {
        if (Engine.instance!.client === Client.Browser) { // REVIEW: Circular dependency
            // requestAnimationFrame( this.update ); // NOTE: The update is caleld by Engine.
            // this.mesh!.rotation.x += 0.01;
            // this.mesh!.rotation.y += 0.02;
            // this.renderer!.render( this.scene!, this.camera! );
        }
    }
}
