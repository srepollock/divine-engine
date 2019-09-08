import { Entity, Shader } from "src";

export interface IComponent {
    name: string;
    readonly owner: Entity | undefined;
    destroy(): void;
    load(): void;
    render(shader: Shader): void;
    setOwner(owner: Entity): void;
    update(delta: number): void;
    updateReady(): void;
}