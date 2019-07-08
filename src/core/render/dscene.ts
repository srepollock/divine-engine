import { Scene } from "three";
import { DObject } from "../dobject";
import { Entity } from "../entity";

export class DScene extends DObject {
    private _name: string;
    private _threeScene: Scene;
    public get name(): string {
        return this._name;
    }
    public get threeScene(): Scene {
        return this._threeScene;
    }
    constructor(name: string = "Divine Engine Scene") {
        super("scene");
        this._name = name;
        this._threeScene = new Scene();
    }
    public addEntity(entity: Entity): void {
        this._threeScene.add(entity.mesh);
    }
}