import { DObject } from "../dobject";
import { Entity } from "../entity";
export class Scene extends DObject {
    // NOTE: tslint:disable-next-line:semicolon
    private _entityArray: Array<Entity> = new Array<Entity>();
    private _title: string = "";
    public get entityArray(): Array<Entity> {
        return this._entityArray;
    }
    public set entityArray(newList: Array<Entity>) {
        this._entityArray = newList;
    }
    public get title(): string {
        return this._title;
    }
    constructor(title: string, entities?: Array<Entity>) {
        super("scene");
        this._title = title;
        if (entities !== undefined) {
            this._entityArray = entities;
        }
    }
    public addEntity(e: Entity): void {
        this._entityArray.push(e);
    }
    public addEntities(eList: Array<Entity>): void {
        // TODO: Implement this
    }
    // NOTE: These are to be managed by the SceneManager only however. 
    // NOTE: How do I do this?
    public start(): void {

    }
    public restart(): void {
        
    }
    public stop(): void {

    }
    public shutdown(): void {
        this.cleanup();
    }
    /**
     * Updates all entities in the scene.
     * Called from Engine.update()
     * @param  {number} delta Delta time
     * @returns void
     */
    public update(delta: number): void {
        // REVIEW: Is this necessary?
    }
    /**
     * Unloads the current scene, and provides any other clenaup steps necessary.
     * @returns void
     */
    private cleanup(): void {
        // TODO: Do entities need to be passed here?
        // NOTE: If things need to be loaded to the next scene, should I send it through the message system?
    }
}

