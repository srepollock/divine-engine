export interface IAssetLoader {
    readonly supportedExtensions: Array<string>;
    loadAsset(assetName: string): void;
}