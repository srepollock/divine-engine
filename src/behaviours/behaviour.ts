import { Entity } from "../core/entity";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourData } from "./IBehaviourData";

export abstract class Behaviour implements IBehaviour {
    public name: string;   
    protected _data: IBehaviourData; 
    protected _owner!: Entity;
    constructor(data: IBehaviourData) {
        this._data = data;
        this.name = data.name;
    }
    public apply(userData: any): void {

    }
    public setFromJson(json: any): void {
        throw new Error("Method not implemented.");
    }
    public setOwner(owner: Entity): void {
        this._owner = owner;
    }
    public update(delta: number): void {

    }
    public updateReady(): void {

    }
}