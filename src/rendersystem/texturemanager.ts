import { Texture, TextureReferenceNode } from "src";

export class TextureManager {
    private static _textures: Map<string, TextureReferenceNode> = new Map();
    private constructor() {

    }
    public static getTexture(textureName: string): Texture {
        if (TextureManager._textures.get(textureName) === undefined) {
            let texture = new Texture(textureName);
            TextureManager._textures.set(textureName, new TextureReferenceNode(texture));
        } else {
            TextureManager._textures.get(textureName)!.referenceCount++; 
        }
        return TextureManager._textures.get(textureName)!.texture;
    }
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