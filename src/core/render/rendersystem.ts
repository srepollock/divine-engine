import * as THREE from "three";
import { Engine } from "../engine";
import { Client } from "../helperfunctions";
import { System } from "../isystem";
export class RenderSystem implements System {
    public camera: any | undefined;
    public scene: THREE.Scene | undefined;
    public geometry: THREE.Geometry | undefined;
    public material: THREE.Material | undefined;
    public mesh: THREE.Mesh | undefined;
    public renderer: THREE.WebGLRenderer | undefined;

    constructor(width: number, height: number) {
        this.camera = undefined;
        this.scene = undefined;
        this.geometry = undefined;
        this.material = undefined;
        this.mesh = undefined;
        this.renderer = undefined;
        if (Engine.instance.client === Client.Browser) { // REVIEW: Circular dependency
            this.camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
            this.camera.position.z = 1;
            this.scene = new THREE.Scene();
            this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
            this.material = new THREE.MeshNormalMaterial();

            this.mesh = new THREE.Mesh( this.geometry, this.material );
            this.scene.add( this.mesh );

            this.renderer = new THREE.WebGLRenderer( { antialias: true } );
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( this.renderer.domElement );
        } else if (Engine.instance.client === Client.Electron) {
            // TODO: Something else.
        } else {
            // Console running
        }
    }
    public cleanup(): void {
        // TODO: Cleanup anything that is not necessary
    }
    public initialize(): void {
        
    }
    public shutdown(): void {
        this.cleanup();
    }
    public start(): void {

    }
    public stop(): void {

    }
    public update(delta: number): void {
        if (Engine.instance.client === Client.Browser) { // REVIEW: Circular dependency
            // requestAnimationFrame( this.update ); // NOTE: The update is caleld by Engine.
            this.mesh!.rotation.x += 0.01;
            this.mesh!.rotation.y += 0.02;
            this.renderer!.render( this.scene!, this.camera! );
        }
    }
}