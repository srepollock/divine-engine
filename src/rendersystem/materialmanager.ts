import { Material } from "../core/material";
import { MaterialReferenceNode } from "./materialreferencenode";

export class MaterialManager {
    private static _materials: Map<string, MaterialReferenceNode> = new Map();
    private constructor() {

    }
    public static registerMaterial(material: Material): void {
        if (MaterialManager._materials.get(material.name) === undefined) {
            MaterialManager._materials.set(material.name, new MaterialReferenceNode(material));
        }
    }
    public static getMaterial(materialName: string): Material | undefined {
        if (MaterialManager._materials.get(materialName) === undefined) {
            console.warn(`Material ${materialName} cannot be found. The material may not have been loaded.`);
            return undefined;
        } else {
            MaterialManager._materials.get(materialName)!.referenceCount++;
            return MaterialManager._materials.get(materialName)!.material;
        }
    }
    public static releaseMaterial(materialName: string): void {
        if (MaterialManager._materials.get(materialName) === undefined) {
            console.warn(`Cannot release material ${materialName} as it has not been registered.`);
        } else {
            if (MaterialManager._materials.get(materialName)!.referenceCount < 1) {
                MaterialManager._materials.get(materialName)!.material.destroy();
                MaterialManager._materials.delete(materialName);
            }
        }
    }
}