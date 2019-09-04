import { Vector2 } from "../math/vector2";

export interface IShape2D {
    position: Vector2;
    origin: Vector2;
    readonly offset: Vector2;
    setFromJson(json: any): void;
    intersect(other: any): boolean;
    pointInShape(point: Vector2): boolean;
}