import { Entity } from "../core/entity";
import { IBehaviour } from "./ibehaviour";
import { IBehaviourData } from "./ibehaviourdata";

export abstract class Behaviour implements IBehaviour {
    public name: string;   
    protected _data: IBehaviourData; 
    protected _owner: Entity | undefined;
    /**
     * Class constructor
     * @param  {IBehaviourData} data
     */
    constructor(data: IBehaviourData) {
        this._data = data;
        this.name = data.name;
    }
    /**
     * Applies user data to the behaviour
     * @param  {any} userData
     * @returns void
     */
    public apply(userData: any): void {

    }
    /**
     * Removes the owner from the behaviour.
     * @returns void
     */
    public destroy(): void {
        this._owner = undefined;
    }
    /**
     * Sets the behaviour data from json format.
     * @param  {any} json
     * @returns void
     */
    public setFromJson(json: any): void {
        
    }
    /**
     * Gets the owner Entity of the behaviour.
     * @returns Entity
     */
    public getOwner(): Entity | undefined {
        return this._owner;
    }
    /**
     * Sets the owner of the behaviour.
     * @param  {Entity} owner
     * @returns void
     */
    public setOwner(owner: Entity): void {
        this._owner = owner;
    }
    /**
     * Updates the behaviour.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {

    }
    /**
     * Checks if the behaviour is ready to update.
     * @returns void
     */
    public updateReady(): void {

    }
}