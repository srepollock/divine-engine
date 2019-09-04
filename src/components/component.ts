import { IComponent, IComponentData } from ".";

import { Entity, Shader } from "src";

export abstract class Component implements IComponent {
    public name: string;
    protected _owner: Entity | undefined;
    protected _data: IComponentData;
    public get owner(): Entity | undefined {
        return this._owner;
    }
    constructor(data: IComponentData) {
        this._data = data;
        this.name = this._data.name;
    }
    public load(): void {
        
    }
    public render(shader: Shader): void {

    }
    public setOwner(owner: Entity): void {
        this._owner = owner;
    }
    public update(delta: number): void {

    }
    public updateReady(): void {
        
    }
}