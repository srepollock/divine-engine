import { Texture } from "src";

export class TextureReferenceNode {
    public texture: Texture;
    public referenceCount: number = 1;
    /**
     * Class constructor.
     * @param  {Texture} texture
     */
    constructor(texture: Texture) {
        this.texture = texture;
    }
}