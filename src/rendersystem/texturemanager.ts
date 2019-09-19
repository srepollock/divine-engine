import { Texture, TextureReferenceNode } from "src";

export class TextureManager {
    private static _textures: Map<string, TextureReferenceNode> = new Map();
    /**
     * Class constructor.
     */
    private constructor() {

    }
    /**
     * Gets the texture by name from the manager.
     * @param  {string} textureName
     * @returns Texture
     */
    public static getTexture(textureName: string): Texture {
        if (TextureManager._textures.get(textureName) === undefined) {
            let texture = new Texture(textureName);
            TextureManager._textures.set(textureName, new TextureReferenceNode(texture));
        } else {
            TextureManager._textures.get(textureName)!.referenceCount++; 
        }
        return TextureManager._textures.get(textureName)!.texture;
    }
    /**
     * Releases a texture from the manager.
     * @param  {string} textureName
     * @returns void
     */
    public static releaseTexture(textureName: string): void {
        if (TextureManager._textures.get(textureName) === undefined) {
            console.warn(`Texture ${textureName} was undefined and cannot be released.`);
        } else {
            TextureManager._textures.get(textureName)!.referenceCount--;
            if (TextureManager._textures.get(textureName)!.referenceCount < 1) {
                TextureManager._textures.get(textureName)!.texture.destroy();
                TextureManager._textures.delete(textureName);
            }
        }
    }
}