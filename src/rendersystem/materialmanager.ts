import { Material } from "../core/material";
import { MaterialReferenceNode } from "./materialreferencenode";

export class MaterialManager {
    private static _materials: Map<string, MaterialReferenceNode> = new Map();
    /**
     * Class constructor.
     */
    private constructor() {

    }
    /**
     * Registers a material to the manager.
     * @param  {Material} material
     * @returns void
     */
    public static registerMaterial(material: Material): void {
        if (MaterialManager._materials.get(material.name) === undefined) {
            MaterialManager._materials.set(material.name, new MaterialReferenceNode(material));
        }
    }
    /**
     * Gets a material from the manager by name.
     * @param  {string} materialName
     * @returns Material
     */
    public static getMaterial(materialName: string): Material | undefined {
        if (MaterialManager._materials.get(materialName) === undefined) {
            console.warn(`Material ${materialName} cannot be found. The material may not have been loaded.`);
            return undefined;
        } else {
            MaterialManager._materials.get(materialName)!.referenceCount++;
            return MaterialManager._materials.get(materialName)!.material;
        }
    }
    /**
     * Releases a material from reference. Called when an object referencing the material is destroyed.
     * @param  {string} materialName
     * @returns void
     */
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