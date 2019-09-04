import { Entity } from "../core/entity";

export interface IBehaviour {
    name: string;
    apply(userData: any): void;
    update(delta: number): void;
    updateReady(): void;
    setOwner(owner: Entity): void;
}