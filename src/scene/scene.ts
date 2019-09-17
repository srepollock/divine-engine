import { Entity, Shader } from "src";

export class Scene {
    private _root: Entity;
    /**
     * Class constructor.
     */
    constructor() {
        this._root = new Entity({ name: "__WORLD_ROOT__", scene: this});
    }
    /**
     * Gets the root entity object in the scene.
     * @returns Entity
     */
    public get root(): Entity {
        return this._root;
    }
    /**
     * Checks if all entities in the scene are loaded.
     * @returns boolean
     */
    public get isLoaded(): boolean {
        return this._root.isLoaded;
    }
    /**
     * Adds an entity to the root object.
     * @param  {Entity} child
     * @returns void
     */
    public addEntity(child: Entity): void {
        this._root.addChild(child);
    }
    /**
     * Gets an object by name through the root object.
     * @param  {string} name
     * @returns Entity
     */
    public getObjectByName(name: string): Entity | undefined {
        let e = this._root.getObjectByName(name);
        if (e !== undefined) {
            return e;
        }
        console.warn(`Entity ${name} could not be found in the scene.`);
        return undefined;
    }
    /**
     * Loads the root and all it's children.
     * @returns void
     */
    public load(): void {
        this._root.load();
    }
    /**
     * Updates the scene. Calls update on the root and all it's children.
     * @param  {Shader} shader
     * @returns void
     */
    public update(delta: number): void {
        this._root.update(delta);
    }
    /**
     * Renders the scene. Calls render on the root and all it's children.
     * @param  {Shader} shader
     * @returns void
     */
    public render(shader: Shader): void {
        this._root.render(shader);
    }
}