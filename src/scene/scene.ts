import { Entity, Shader } from "src";

export class Scene {
    private _root: Entity;
    constructor() {
        this._root = new Entity({ name: "__WORLD_ROOT__", scene: this});
    }
    public get root(): Entity {
        return this._root;
    }
    public get isLoaded(): boolean {
        return this._root.isLoaded;
    }
    public addEntity(child: Entity): void {
        this._root.addChild(child);
    }
    public getObjectByName(name: string): Entity | undefined {
        let e = this._root.getObjectByName(name);
        if (e !== undefined) {
            return e;
        }
        console.warn(`Entity ${name} could not be found in the scene.`);
        return undefined;
    }
    public load(): void {
        this._root.load();
    }
    public update(delta: number): void {
        this._root.update(delta);
    }
    public render(shader: Shader): void {
        this._root.render(shader);
    }
}