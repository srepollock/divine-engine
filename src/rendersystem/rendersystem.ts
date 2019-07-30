import { Camera, PerspectiveCamera, WebGLRenderer } from "three";
import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
import { System } from "../core/system";
import { RenderStream } from "../core/systemstreams";
import { DScene } from "./dscene";
import { SceneManager } from "./scenemanager";
export class RenderSystem extends System {
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
    public get running(): boolean {
        return this._running;
    }
    /**
     * Gets the canvas' width.
     * @returns number
     */
    public get width(): number {
        return this._canvas.width;
    }
    /**
     * Gets the render systems instance for Engine use.
     * @returns RenderSystem
     */
    public static get instance(): RenderSystem {
        return RenderSystem._instance;
    }
    private static _instance: RenderSystem;
    private _canvas: HTMLCanvasElement;
    private _camera: Camera;
    private _renderer: WebGLRenderer;
    private _running: boolean;
    private _sceneManager: SceneManager;
    /**
     * Render system constructor.
     * @param  {number} width
     * @param  {number} height
     */
    private constructor({ width, height, scenes }: {
        width?: number, 
        height?: number,
        scenes?: Array<DScene>,
    } = {}) {
        super("rendersystem");
        if (scenes !== undefined) {
            this._sceneManager = new SceneManager(scenes);
        } else {
            this._sceneManager = new SceneManager();
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
        this._running = true;
        RenderSystem._instance = this; // NOTE: Render System has been created.
    }
    /**
     * Initializes the system.
     * @returns void
     */
    public static initialize({ width, height, scenes }: {
        width?: number, 
        height?: number,
        scenes?: Array<DScene>,
    } = {}): void {
        new RenderSystem({width, height, scenes});
    }
    /**
     * @returns void
     * @override
     */
    public cleanup(): void {
        RenderSystem.instance._sceneManager.shutdown();
    }
    /**
     * Called when the RenderSystem needs to cleanup and shutdown.
     * @returns void
     */
    public shutdown(): void {
        RenderSystem.instance.cleanup();
    }
    /**
     * RenderSystem start method.
     * @returns void
     */
    public start(): void {
        RenderSystem.instance._running = true;
    }
    /**
     * RenderSystem stop method. Called to stop updating, but continue running (could start later).
     * @returns void
     */
    public stop(): void {
        RenderSystem.instance._running = false;
    }
    /**
     * The RenderSystem update method. Called from within the engine. This should be called through the 
     * message system however.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        if (RenderSystem.instance._running) {
            /**
             * // TODO: Call this through the message system.
             * // REVIEW: Update this and other systems.
             * RenderStream.on("data", (data as Message) => {
             *   if (data.messageType == MessageType.Render) {
             *     // Render it out.
             *   }
             * });
             */
            log(LogLevel.info, `Renderer delta: ${delta}`);
            // tslint:disable-next-line: max-line-length
            RenderSystem.instance._renderer.render(RenderSystem.instance._sceneManager.scene.threeScene, RenderSystem.instance._camera);
        }
    }
}
