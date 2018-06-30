import { Entity } from "../core/entity";

export class Scene {
    public entityArray: Entity[];
    constructor(ea?: Entity[]) {
        if (ea) {
            this.entityArray = ea;
        } else {
            this.entityArray = [];
        }
    }
    // NOTE: These are to be managed by the SceneManager only however. 
    // NOTE: How do I do this?
    public start(): void {

    }
    public restart(): void {
        
    }
    public stop(): void {

    }
}