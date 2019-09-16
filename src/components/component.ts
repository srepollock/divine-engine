import { IComponent, IComponentData } from ".";

import { Entity, Shader } from "src";

export abstract class Component implements IComponent {
    public name: string;
    protected _owner: Entity | undefined;
    protected _data: IComponentData;
    /**
     * Gets the owner of the component.
     * @returns Entity
     */
    public get owner(): Entity | undefined {
        return this._owner;
    }
    /**
     * Class constructor.
     * @param  {IComponentData} data
     */
    constructor(data: IComponentData) {
        this._data = data;
        this.name = this._data.name;
    }
    /**
     * Destroys the component.
     * @returns void
     */
    public destroy(): void {
        this._owner = undefined;
    }
    /**
     * Loads the component.
     * @returns void
     */
    public load(): void {
        
    }
    /**
     * Renders the component to the screen.
     * @param  {Shader} shader
     * @returns void
     */
    public render(shader: Shader): void {

    }
    /**
     * Sets the owner as the entity given.
     * @param  {Entity} owner
     * @returns void
     */
    public setOwner(owner: Entity): void {
        this._owner = owner;
    }
    /**
     * Updates the current component.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {

    }
    /**
     * Gets if the update is ready.
     * @returns void
     */
    public updateReady(): void {
        
    }
}