import { Entity } from "../core/entity";
import { Scene } from "../core/scene";

// REVIEW: Should this be an abstract class instead?
export interface SceneManager {
    buildScene(filename: string, entities?: Array<Entity>): Scene;
    loadScene(filename: string): Scene;
    shutdown(): void;
    getScene(): Scene;
    setScene(scene: Scene): void;
    unloadScene(filename: string): void;
}

