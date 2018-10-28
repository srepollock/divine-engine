
export interface IAssetLoader {
    readonly extensions: Array<string>;
    /**
     * 
     * NOTE: Should be default true in all implementations.
     * @param name 
     * @param extension {Default: true}
     */
    loadAsset(name: string, extension?: boolean): void;
}