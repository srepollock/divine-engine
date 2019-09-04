import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
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
            log(LogLevel.error, `Collision component data requires shape to be defined.`, ErrorCode.NoShape);
        } else {
            if (json.shape.type === undefined) {
                log(LogLevel.error, `Collision component data requires shape type to be defined.`, 
                    ErrorCode.NoShapeType);
            } else {
                switch (String(json.shape.type).toLowerCase()) {
                    case "rectangle":
                        this.shape = new Rectangle2D();
                        break;
                    case "circle":
                        this.shape = new Circle2D();
                        break;
                    default:
                        log(LogLevel.error, `Shape ${String(json.shape.type)} cannot be handled.`, 
                            ErrorCode.ShapeNotAllowed);
                }
            }
            this.shape.setFromJson(json.shape);
        }
    }
}