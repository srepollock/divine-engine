import { Texture } from "../core/texture";
import { Color } from "../rendersystem/color";
import { TextureManager } from "../rendersystem/texturemanager";

export class Material {
    private _name: string;
    private _diffuseTextureName: string;
    private _diffuseTexture: Texture | undefined;
    private _tint: Color;
    public get name(): string {
        return this._name;
    }
    public get diffuseTextureName(): string {
        return this._diffuseTextureName;
    }
    public set diffuseTextureName(name: string) {
        if (this._diffuseTexture !== undefined) {
            TextureManager.releaseTexture(this.diffuseTextureName);
        }
        this._diffuseTextureName = name;
        if (this._diffuseTextureName !== undefined) {
            this._diffuseTexture = TextureManager.getTexture(this._diffuseTextureName);
        } 
    }
    public get diffuseTexture(): Texture | undefined {
        return this._diffuseTexture;
    }
    public get tint(): Color {
        return this._tint;
    }
    constructor(name: string, diffuseTextureName: string, tint: Color) {
        this._name = name;
        this._diffuseTextureName = diffuseTextureName;
        if (this._diffuseTextureName !== undefined) {
            this._diffuseTexture = TextureManager.getTexture(this._diffuseTextureName);
        }
        this._tint = tint; 
    }
    public destroy(): void {
        TextureManager.releaseTexture(this._diffuseTextureName);
        this._diffuseTexture = undefined;
    }
}