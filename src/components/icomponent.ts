import { Entity, Shader } from "src";

export interface IComponent {
    name: string;
    readonly owner: Entity | undefined;
    load(): void;
    render(shader: Shader): void;
    setOwner(owner: Entity): void;
    update(delta: number): void;
    updateReady(): void;
}