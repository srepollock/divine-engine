import { IBehaviourData } from "./ibehaviourdata";

export class KeyboardMovementBehaviourData implements IBehaviourData {
    public name!: string;
    public speed: number = 1;
    public setFromJson(json: any): void {
        if (json.name === undefined) {
            throw new Error(`Name must be defined in behaviour data.`);
        }
        if (json.speed !== undefined) {
            this.speed = Number(json.speed);
        }
        this.name = String(json.name);
    }
}