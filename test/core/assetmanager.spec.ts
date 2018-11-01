import { AssetManager, IAsset, JSONAssetLoader } from "../../src";
import { expect } from "chai";

describe("Asset manager unit tests", () => {
    before(() => {
        AssetManager.initialize();
    });
    it("should be initialized", () => {
        expect(AssetManager.instance).to.not.throw();
        expect(AssetManager.instance).to.not.be.undefined;
    });
    it("should have 2 asset loaders loaded", () => {
        expect(AssetManger.loaders.length).to.equal(2);
    });
    it("should be able to load another loader", () => {
        class TmpLoader implements JSONAssetLoader {}
        AssetManager.registerLoader(new TmpLoader());
        expect(AssetManager.loaders.length).to.equal(3);
        expect(AssetManager.loaders[2]).to.not.be.undefined;
    });
    it("should not throw an error when trying to load an asset that is not found", () => {
        expect(AssetManager.loadAsset("temp")).to.throw();
    });
    it("should not throw an error when giving an object to load", () => {
        var tempScene = new Scene();
        expect(AssetManager.loadAsset({name: "temp", data: tempScene})).to.not.throw();
        expect(AssetManager.isAssetLoaded("temp")).to.be.true;
    });
    it("should return true that asset \"temp\" is loaded", () => {
        expect(AssetManager.isAssetLoaded("temp")).to.be.true;
    });
    it("should load an asset if not loaded in getAsset()", () => {
        expect(AssetManager.getAsset("temp2")).to.be.undefined;
        expect(AssetManager.isAssetLoaded("temp2")).to.be.true;
        expect(AssetManager.getAsset("temp2")).to.be(IAsset);
    });
    it("should cleanup on shutdown call", () => {
        expect(AssetManager.instance).to.not.be.undefined;
        AssetManager.shutdown();
        expect(AssetManager.instance).to.throw;
    });
});
