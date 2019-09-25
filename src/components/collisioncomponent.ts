import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { Vector2 } from "../math/vector2";
import { CollisionManager } from "../physicssystem/collisionmanager";
import { IShape2D } from "../rendersystem/ishape2d";
import { Circle2D, Rectangle2D } from "../rendersystem";
import { Shader } from "../rendersystem/shader";
import { Component } from "./component";
import { IComponentData } from "./icomponentdata";
import { IComponent } from "./icomponent";
import { IComponentBuilder } from "./icomponentbuilder";

export class CollisionComponent extends Component {
    private _shape: IShape2D;
    private _static: boolean;
    /**
     * Gets the collision shape.
     * @returns IShape2D
     */
    public get shape(): IShape2D {
        return this._shape;
    }
    /**
     * Checks if the object is static.
     * Will not be included in collisions if the object is static.
     * @returns boolean
     */
    public get isStatic(): boolean {
        return this._static;
    }
    /**
     * Sets the object to static or not.
     * @param  {boolean} value
     */
    public set isStatic(value: boolean) {
        this._static = value;
    }
    /**
     * Class constructor.
     * @param  {CollisionComponentData} data
     */
    public constructor(data: CollisionComponentData) {
        super(data);
        this._shape = data.shape;
        this._static = data.static;
    }
    /**
     * Loads the collision component.
     * @returns void
     */
    public load(): void {
        super.load();
        this._shape.position.copy(new Vector2(this.owner!.getWorldPosition().x, 
            this.owner!.getWorldPosition().y).add(this._shape.offset));
        CollisionManager.registerCollisionComponent(this);
    }
    /**
     * Renders the collision component.
     * @param  {Shader} shader
     * @returns void
     */
    public render(shader: Shader): void {
        super.render(shader);
    }
    /**
     * Updates the collision component.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        this._shape.position.copy(new Vector2(this.owner!.getWorldPosition().x, 
            this.owner!.getWorldPosition().y).add(this._shape.offset));
        super.update(delta);
    }
    /**
     * Handler for collision entry.
     * @param  {CollisionComponent} other
     * @returns void
     */
    public onCollisionEntry(other: CollisionComponent): void {
        log(LogLevel.debug, `onCollisionEntry: ${this} ${other}`);
        console.log(this, other);
    }
    /**
     * Handler for the collision update.
     * @param  {CollisionComponent} other
     * @returns void
     */
    public onCollisionUpdate(other: CollisionComponent): void {
        
    }
    /**
     * Handler for the collision exit.
     * @param  {CollisionComponent} other
     * @returns void
     */
    public onCollisionExit(other: CollisionComponent): void {
        log(LogLevel.debug, `onCollisionExit: ${this} ${other}`);
        console.log(this, other);
    }
}

export class CollisionComponentData implements IComponentData {
    public name!: string;
    public shape!: IShape2D;
    public static: boolean = false;
    /**
     * Class constructor
     * @param  {any} json
     */
    constructor(json: any) {
        this.setFromJson(json);
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
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

export class CollisionComponentBuilder implements IComponentBuilder {
    /**
     * Type of component to build.
     * @returns string
     */
    public get type(): string {
        return "collision";
    }
    /**
     * Builds the component from JSON.
     * @param  {any} json
     * @returns IComponent
     */
    public buildFromJson(json: any): IComponent {
        let data: CollisionComponentData = new CollisionComponentData(json);
        return new CollisionComponent(data);
    }
}