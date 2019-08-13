import { Camera, PerspectiveCamera, WebGLRenderer } from "three";
import { RenderStream } from "../core";
import { log, LogLevel } from "../core/loggingsystem/src";
import { System } from "../core/system";
import { DScene } from "./dscene";
import { SceneManager } from "./scenemanager";
export class RenderSystem extends System {
    /**
     * Gets the canvas element that the render system is using.
     * @returns HTMLCanvasElement
     */
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
     * Gets the render systems instance for Engine use.
     * @returns RenderSystem
     */
    public static get instance(): RenderSystem {
        return RenderSystem._instance;
    }
    /**
     * Gets the status of the render system whether it is running or not.
     * @returns boolean
     */
    public get running(): boolean {
        return this._running;
    }
    /**
     * Gets the SceneManager that the RenderSystem is using.
     * @returns SceneManager
     */
    public get sceneManager(): SceneManager {
        return this._sceneManager;
    }
    /**
     * Gets the canvas' width.
     * @returns number
     */
    public get width(): number {
        return this._canvas.width;
    }
    private static _instance: RenderSystem;
    private _canvas: HTMLCanvasElement;
    private _camera: Camera;
    private _running: boolean = false;
    private _renderer: WebGLRenderer;
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
        this._systemStream = new RenderStream();
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
        this._renderer = new WebGLRenderer();
        this._renderer.setSize(width, height);
        this._canvas = document.body.appendChild(this._renderer.domElement);
        RenderSystem._instance = this;
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
        RenderSystem.instance.start();
    }
    /**
     * Cleans up the RenderSystem to shutdown.
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
     * Starts the RenderSystem.
     * @returns void
     */
    public start(): void {
        if (!RenderSystem.instance.running) {
            // var geometry = new BoxGeometry( 1, 1, 1 );
            // var material = new MeshBasicMaterial( { color: 0x00ff00 } );
            // this._cube = new Mesh( geometry, material );
            // this._sceneManager.scene.threeScene.add( this._cube );
            this._camera.position.z = 5;
        }
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
            RenderSystem._instance._renderer.render(RenderSystem._instance._sceneManager.scene.threeScene, 
                RenderSystem._instance._camera);
        }
    }
}
