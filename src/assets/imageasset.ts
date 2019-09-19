import { IAsset } from "./iasset";

export class ImageAsset implements IAsset {
    public readonly name: string;
    public readonly data: HTMLImageElement;
    /**
     * Class constructor
     * @param  {string} name
     * @param  {HTMLImageElement} data
     */
    constructor(name: string, data: HTMLImageElement) {
        this.name = name;
        this.data = data;
    }
    /**
     * Gets the width of the image.
     * @returns number
     */
    public get width(): number {
        return this.data.width;
    }
    /**
     * Gets the height of the image.
     * @returns number
     */
    public get height(): number {
        return this.data.height;
    }
}