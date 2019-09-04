import { Texture } from "src";

export class TextureReferenceNode {
    public texture: Texture;
    public referenceCount: number = 1;
    constructor(texture: Texture, ) {
        this.texture = texture;
    }
}