import { Entity } from "../core/entity";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourData } from "./ibehaviourdata";

export abstract class Behaviour implements IBehaviour {
    public name: string;   
    protected _data: IBehaviourData; 
    protected _owner: Entity | undefined;
    constructor(data: IBehaviourData) {
        this._data = data;
        this.name = data.name;
    }
    public apply(userData: any): void {

    }
    public destroy(): void {
        this._owner = undefined;
    }
    public setFromJson(json: any): void {
        
    }
    public getOwner(): Entity | undefined {
        return this._owner;
    }
    public setOwner(owner: Entity): void {
        this._owner = owner;
    }
    public update(delta: number): void {

    }
    public updateReady(): void {

    }
}