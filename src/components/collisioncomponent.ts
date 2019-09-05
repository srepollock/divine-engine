import { log, LogLevel } from "../core/loggingsystem/src";
import { Vector2 } from "../math/vector2";
import { CollisionManager } from "../physicssystem/collisionmanager";
import { IShape2D } from "../rendersystem/ishape2d";
import { Shader } from "../rendersystem/shader";
import { CollisionComponentData } from "./collisioncomponentdata";
import { Component } from "./component";

export class CollisionComponent extends Component {
    private _shape: IShape2D;
    private _static: boolean;
    public get shape(): IShape2D {
        return this._shape;
    }
    public get isStatic(): boolean {
        return this._static;
    }
    public constructor(data: CollisionComponentData) {
        super(data);
        this._shape = data.shape;
        this._static = data.static;
    }
    public load(): void {
        super.load();
        this._shape.position.copy(new Vector2(this.owner!.getWorldPosition().x, 
            this.owner!.getWorldPosition().y).add(this._shape.offset));
        CollisionManager.registerCollisionComponent(this);
    }
    public render(shader: Shader): void {
        super.render(shader);
    }
    public update(delta: number): void {
        this._shape.position.copy(new Vector2(this.owner!.getWorldPosition().x, 
            this.owner!.getWorldPosition().y).add(this._shape.offset));
        super.update(delta);
    }
    public onCollisionEntry(other: CollisionComponent): void {
        log(LogLevel.debug, `onCollisionEntry: ${this} ${other}`);
        console.log(this, other);
    }
    public onCollisionUpdate(other: CollisionComponent): void {
        
    }
    public onCollisionExit(other: CollisionComponent): void {
        log(LogLevel.debug, `onCollisionExit: ${this} ${other}`);
        console.log(this, other);
    }
}