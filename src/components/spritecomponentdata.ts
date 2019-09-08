import { IComponentData } from ".";

import { Vector3 } from "src";

export class SpriteComponentData implements IComponentData {
    public name!: string;
    public materialName!: string;
    public origin: Vector3 = new Vector3(0.5, 0.5);
    public width!: number;
    public height!: number;
    constructor(json: any) {
        this.setFromJson(json);
    }
    public setFromJson(json: any): void {
        if (json.name !== undefined) {
            this.name = json.name;
        }
        if (json.materialName !== undefined) {
            this.materialName = json.materialName;
        }
        if (json.origin !== undefined) {
            this.origin.setFromJson(json.origin);
        }
        if (json.width !== undefined) {
            this.width = Number(json.width);
        }
        if (json.height !== undefined) {
            this.height = Number(json.height);
        }
    }
}