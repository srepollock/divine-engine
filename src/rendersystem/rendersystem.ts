import * as THREE from "three";
import { Camera, PerspectiveCamera, WebGLRenderer } from "three";
import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
import { System } from "../core/system";
import { RenderStream } from "../core/systemstreams";
import { DScene } from "./dscene";
import { SceneManager } from "./scenemanager";
export class RenderSystem extends System {
    private static _instance: RenderSystem;
    private _canvas: HTMLCanvasElement;
    private _camera: Camera;
    private _renderer: WebGLRenderer;
    private _sceneManager: SceneManager;
    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    /**
     * Gets the canvas' height.
     * @returns number
     */
    public get height(): number {
        return this._canvas.height;
    }
    /**
     * Gets the canvas' width.
     * @returns number
     */
    public get width(): number {
        return this._canvas.width;
    }
    /**
     * Render system constructor.
     * @param  {number} width
     * @param  {number} height
     */
    private constructor({ width, height, scenes, sceneManager }: {
        width?: number, 
        height?: number,
        scenes?: Array<DScene>,
        sceneManager?: SceneManager
    } = {}) {
        super("rendersystem");
        if (sceneManager === undefined) {
            this._sceneManager = new SceneManager(scenes);
        } else if (scenes !== undefined) {
            this._sceneManager = sceneManager;
            sceneManager.loadScenes(scenes);
        } else {
            this._sceneManager = sceneManager;
            this._sceneManager.createEmptyScene();
        }
        if (width === undefined || height === undefined) {
            width = window.innerWidth;
            height = window.innerHeight;
        }
        this._camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
        this._camera.position.z = 5;
        this._renderer = new WebGLRenderer();
        this._renderer.setSize(width, height);
        this._canvas = document.body.appendChild(this._renderer.domElement);
        RenderSystem._instance = this; // NOTE: Render System has been created.
    }
    /**
     * Gets the render systems instance for Engine use.
     * @returns RenderSystem
     */
    public static get instance(): RenderSystem {
        return RenderSystem._instance;
    }
    /**
     * Initializes the system.
     * @returns void
     */
    public static initialize({ width, height, scenes, sceneManager }: {
        width?: number, 
        height?: number,
        scenes?: Array<DScene>,
        sceneManager?: SceneManager
    } = {}): void {
        new RenderSystem({width, height, scenes, sceneManager});
    }
    /**
     * @returns void
     * @override
     */
    public cleanup(): void {
        this._sceneManager.shutdown();
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
        log(LogLevel.info, `Renderer delta: ${delta}`);
        this._renderer.render(this._sceneManager.scene.threeScene, this._camera);
    }
}
