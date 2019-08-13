import { log, LogLevel } from "src/core";
import { guid } from "src/helper";
import { Vector3 } from "src/math";
import { Component } from "./component";

export class PhysicsBodyComponent extends Component {
    /**
     * Current map of forces on the physics body.
     */
    private _forces: Map<string, Vector3> = new Map<string, Vector3>();
    /**
     * Gets the current forces being applied to this physics body.
     * @returns Map
     */
    public get forces(): Map<string, Vector3> {
        return this._forces;
    }
    constructor(forces?: Map<string, Vector3>) {
        super("physicsbody.component");
        if (forces) {
            forces.forEach((value, key) => {
                this.addForce(value, key);
            });
        }
    }
    /**
     * Adds a force to the array of forces affecting the current physics body.
     * @param  {Vector3} f
     * @param  {string} id GUID or any string of the object applying the force to ID the force, else creates a unique id
     * @returns boolean if the force was applied or not.
     */
    public addForce(f: Vector3, id?: string): boolean {
        let tempID: string = (id) ? id : guid();
        this._forces.set(tempID, f);
        return this._forces.size > 0;
    }
    /**
     * Remove the force from the list by the ID (GUID) as the key.
     * @param  {string} id?
     * @returns boolean
     */
    public removeForceByGuid(id?: string): boolean {
        if (!id) {
            log(LogLevel.warning, `No force was removed as no id was specificed for removal.`);
            return false;
        } else {
            return this._forces.delete(id);
        }
    }
}