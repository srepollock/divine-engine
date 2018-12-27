import * as THREE from "three";
import { Engine } from "../engine";
import { Client } from "../helper";
import { ErrorCode, LogCritical, LogWarning } from "../logging";
import { System } from "../system";
export class RenderSystem extends System {
    public static get instance(): RenderSystem | undefined {
        if (this._instance !== undefined) {
            return this._instance;
        } else {
            LogCritical(ErrorCode.RenderSystemUndefined, "Render system is undefined when calling getter.");
            return undefined;
        }
    }
    /**
     * Gets the current scene that is being rendered.
     * @returns THREE
     */
    public static get scene(): THREE.Scene {
        if (this.instance!._scene !== undefined) {
            return this._instance!._scene!;
        } else {
            LogWarning(ErrorCode.SceneUndefined, "Scene was undefined on getter. Creating a new scene now.");
            this._instance!._scene = new THREE.Scene();
            return this._instance!._scene!;
        }
    }
    private static _instance: RenderSystem | undefined;
    private _camera: any | undefined;
    private _scene: THREE.Scene | undefined;
    private _geometry: THREE.Geometry | undefined;
    private _material: THREE.Material | undefined;
    private _mesh: THREE.Mesh | undefined;
    private _renderer: THREE.WebGLRenderer | undefined;
    /**
     * Render system constructor.
     * @param  {number} width
     * @param  {number} height
     */
    private constructor(width: number, height: number) {
        super("rendersystem");
        this._camera = undefined;
        this._scene = undefined;
        this._geometry = undefined;
        this._material = undefined;
        this._mesh = undefined;
        this._renderer = undefined;
        if (Engine.instance!.client === Client.Browser) { // NOTE: For Version 1 of the engine, focus on this
            this._camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
            this._camera.position.z = 1;
            this._scene = new THREE.Scene();
            this._geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
            this._material = new THREE.MeshNormalMaterial();

            this._mesh = new THREE.Mesh( this._geometry, this._material );
            this._scene.add( this._mesh );

            this._renderer = new THREE.WebGLRenderer( { antialias: true } );
            this._renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( this._renderer.domElement );
        } else {
            // tslint:disable-next-line:max-line-length
            LogWarning(ErrorCode.ClientNotSupported, "The client you are currently using is not supported. To learn more please check out the Divine Engine Wiki on GitHub");
        }
        RenderSystem._instance = this;
    }
    /**
     * Render system start method.
     * @returns void
     */
    public static start(width: number, height: number): void {
        new RenderSystem(width, height);
    }
    /**
     * @returns void
     * @override
     */
    public cleanup(): void {
        // TODO: Cleanup anything that is not necessary
    }
    /**
     * Render system shutdown funciton.
     * @returns void
     */
    public shutdown(): void {
        this.stop();
        this.cleanup();
    }
    /**
     * Render system stop funciton.
     * @returns void
     * @override
     */
    public stop(): void {
        
    }
    /**
     * Render system update function.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        // TODO: Handle messages first
        if (Engine.instance!.client === Client.Browser) { // REVIEW: Circular dependency
            // requestAnimationFrame( this.update ); // NOTE: The update is caleld by Engine.
            // TODO: These should be handled in the Physics system as movement.
            this._mesh!.rotation.x += 0.01;
            this._mesh!.rotation.y += 0.02;
            this._renderer!.render( this._scene!, this._camera! );
        }
    }
}