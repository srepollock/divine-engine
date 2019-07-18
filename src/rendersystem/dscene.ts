import { Scene } from "three";
import { DObject } from "../core/dobject";
import { Entity } from "../core/entity";
import { log, LogLevel } from "../core/loggingsystem/src";

export class DScene extends DObject {
    private _name: string;
    private _threeScene: Scene;
    private _entities: Array<Entity> = new Array<Entity>();
    public get name(): string {
        return this._name;
    }
    public get threeScene(): Scene {
        return this._threeScene;
    }
    constructor(name: string = "Divine Engine Scene", entities?: Array<Entity>) {
        super("scene");
        this._name = name;
        this._threeScene = new Scene();
        if (entities !== undefined) {
            log(LogLevel.debug, `Loading entities into scene.`);
            entities.forEach((entity: Entity) => {
                this.addEntity(entity);
            });
        }
    }
    public addEntity(entity: Entity): void {
        this._entities.push(entity);
        this._threeScene.add(entity.mesh);
    }
    public getSceneEntities(): Array<Entity> {
        return this._entities;
    }
    /**
     * Returns this object as a JSON string to send in messages.
     * @returns string
     */
    public asMessage(): string {
        return JSON.stringify(this);
    }
}