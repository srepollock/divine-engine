import { ImageAssetLoader, AssetManager } from "../../../src";

/**
 * @jest-environment jsdom
 */
describe("ImageAssetLoader Integration Test", () => {
    let ial = new ImageAssetLoader();
    AssetManager.initialize();
    it("should load an asset from the asset manager", () => {
        ial.loadAsset("../../assets/peasent.png");
        // expect(ial.loadAsset).toHaveBeenCalled();
    });
});
