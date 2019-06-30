import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Engine as BEngine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { Light } from "@babylonjs/core/Lights/light";
import { LogLevel, log, ErrorCode } from "../loggingsystem/src";

export class SceneManager {
    private _scene: Scene;
    private _canvas: HTMLCanvasElement | undefined;
    private _scenes: Array<Scene>;
    constructor(engine: BEngine, scenes?: Array<Scene>) {
        this._scenes = new Array<Scene>();
        let tempScenes = scenes;
        if (tempScenes === undefined) {
            this._scenes.push(this.createEmptyScene(engine));
        } else if (tempScenes.length <= 0) {
            this._scenes.push(this.createEmptyScene(engine));
        }
        this._scene = this._scenes[0]; // Defaults to the first. Checks for save
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
    public createScene(engine: BEngine, canvas: HTMLCanvasElement, width: number, height: number): Scene {
        // TODO: More stuff goes here
        return new Scene(engine);
    }
    public createEmptyScene(canvas: HTMLCanvasElement, engine: BEngine): Scene {
        // We need a scene to create all our geometry and babylonjs items in
        this._scene = new Scene(engine);
        // Create a camera, and set its position to slightly behind our meshes
        let camera = new FreeCamera("freeCamera", new Vector3(0, 5, -10), this._scene);
        // Make our camera look at the middle of the scene, where we have placed our items
        camera.setTarget(Vector3.Zero());
        // Attach the camera to the canvas, this allows us to give input to the camera
        camera.attachControl(canvas, false);
        // Finally time to add some meshes
        // Create sphere shape and place it above ground
        let sphere = MeshBuilder.CreateSphere("sphere", { segments: 16, diameter: 2 }, this._scene);
        sphere.position.y = 1;
        // Make a plane on the ground
        let ground = MeshBuilder.CreateGround("groundPlane", { width: 6, height: 6, subdivisions: 2 }, this._scene);
        return this._scene;
    }
    public loadScene(scene: Scene): void {
        this._scenes.push(scene);
        log(LogLevel.debug, `Scene loaded ${JSON.stringify(scene)}`);
    }
    public loadScenes(scenes: Array<Scene>): void {
        scenes.forEach((scene) => {
            this._scenes.push(scene);
        });
    }

}