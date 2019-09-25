import { JsonAssetLoader, AssetManager } from "../../../src";

describe("ImageAssetLoader Integration Test", () => {
    let jal = new JsonAssetLoader();
    AssetManager.initialize();
    it("should load an asset from the asset manager", () => {
        jal.loadAsset("../../assets/testzone.json");
        // expect(ial.loadAsset).toHaveBeenCalled();
    });
});