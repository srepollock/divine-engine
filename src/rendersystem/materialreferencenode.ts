import { Material } from "src";

export class MaterialReferenceNode {
    public material: Material;
    public referenceCount: number = 1;
    /**
     * Class constructor.
     * @param  {Material} material
     */
    constructor(material: Material) {
        this.material = material;
    }
}