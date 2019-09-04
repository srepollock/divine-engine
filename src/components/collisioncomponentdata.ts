import { Circle2D, IShape2D, Rectangle2D } from "../rendersystem";
import { IComponentData } from "./icomponentdata";

export class CollisionComponentData implements IComponentData {
    public name!: string;
    public shape!: IShape2D;
    public static: boolean = false;
    constructor(json: any) {
        this.setFromJson(json);
    }
    public setFromJson(json: any): void {
        if (json.name !== undefined) {
            this.name = json.name;
        }
        if (json.static !== undefined) {
            this.static = Boolean(json.static);
        }
        if (json.shape === undefined) {
            throw new Error(`Collision component data requires shape to be defined.`);
        } else {
            if (json.shape.type === undefined) {
                throw new Error(`Collision component data requires shape type to be defined.`);
            } else {
                switch (String(json.shape.type).toLowerCase()) {
                    case "rectangle":
                        this.shape = new Rectangle2D();
                        break;
                    case "circle":
                        this.shape = new Circle2D();
                        break;
                    default:
                        throw new Error(`Shape ${String(json.shape.type)} cannot be handled.`);
                }
            }
            this.shape.setFromJson(json.shape);
        }
    }
}