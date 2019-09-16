import { log, LogLevel } from "de-loggingsystem";
import { Vector2 } from "../math/vector2";
import { CollisionManager } from "../physicssystem/collisionmanager";
import { IShape2D } from "../rendersystem/ishape2d";
import { Shader } from "../rendersystem/shader";
import { CollisionComponentData } from "./collisioncomponentdata";
import { Component } from "./component";

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