import { Texture } from "../core/texture";
import { Color } from "../rendersystem/color";
import { TextureManager } from "../rendersystem/texturemanager";

export class Material {
    private _name: string;
    private _diffuseTextureName: string;
    private _diffuseTexture: Texture | undefined;
    private _tint: Color;
    /**
     * Gets the material name.
     * @returns string
     */
    public get name(): string {
        return this._name;
    }
    /**
     * Gets the diffuse texture name.
     * @returns string
     */
    public get diffuseTextureName(): string {
        return this._diffuseTextureName;
    }
    /**
     * Sets the diffuse texture name.
     * @param  {string} name
     */
    public set diffuseTextureName(name: string) {
        if (this._diffuseTexture !== undefined) {
            TextureManager.releaseTexture(this.diffuseTextureName);
        }
        this._diffuseTextureName = name;
        if (this._diffuseTextureName !== undefined) {
            this._diffuseTexture = TextureManager.getTexture(this._diffuseTextureName);
        } 
    }
    /**
     * Gets the diffuse texture.
     * @returns Texture
     */
    public get diffuseTexture(): Texture | undefined {
        return this._diffuseTexture;
    }
    /**
     * Gets the color tint.
     * @returns Color
     */
    public get tint(): Color {
        return this._tint;
    }
    /**
     * Class constructor.
     * @param  {string} name
     * @param  {string} diffuseTextureName
     * @param  {Color} tint
     */
    constructor(name: string, diffuseTextureName: string, tint: Color) {
        this._name = name;
        this._diffuseTextureName = diffuseTextureName;
        if (this._diffuseTextureName !== undefined) {
            this._diffuseTexture = TextureManager.getTexture(this._diffuseTextureName);
        }
        this._tint = tint; 
    }
    /**
     * Destroys the material.
     * @returns void
     */
    public destroy(): void {
        TextureManager.releaseTexture(this._diffuseTextureName);
        this._diffuseTexture = undefined;
    }
}