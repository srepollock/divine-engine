import { expect } from "chai";
import * as path from "path";
import { AssetManager, Engine, EngineArguments, JSONAssetLoader, LogDebug, Scene } from "../../../src";

describe("Asset Manager unit tests", () => {
    before(() => {
        Engine.start(new EngineArguments({debug: true}));
    });
    it("should be initialized", () => {
        expect(() => {AssetManager.instance; }).to.not.throw();
        expect(AssetManager.instance).to.not.be.undefined;
    });
    it("should have 2 asset loaders loaded after initialization", () => {
        expect(AssetManager.loaders.length).to.equal(2);
    });
    it("should be able to load another loader", () => {
        class TmpLoader extends JSONAssetLoader {}
        AssetManager.registerLoader(new TmpLoader());
        expect(AssetManager.loaders.length).to.equal(3);
        expect(AssetManager.loaders[2]).to.not.be.undefined;
    });
    it("should not throw an error when trying to load an asset that is not found", () => {
        expect(() => {AssetManager.loadAsset("temp"); }).to.not.throw();
    });
    it("should not throw an error when given an object to load", () => {
        var tempScene = new Scene("temp");
        // tslint:disable-next-line:max-line-length
        expect(() => {AssetManager.loadObjectAsset({name: tempScene.title, data: JSON.stringify(tempScene)}); }).to.not.throw();
        expect(AssetManager.isAssetLoaded(tempScene.title)).to.be.true;
    });
    it("should return true that asset \"temp\" is loaded", () => {
        LogDebug(AssetManager.isAssetLoaded("temp"));
        expect(AssetManager.isAssetLoaded("temp")).to.be.true;
    });
    it("should not load an asset from file if given just the asset name", () => {
        expect(AssetManager.getAsset("temp2")).to.be.undefined;
        expect(AssetManager.isAssetLoaded("temp2")).to.be.false;
    });
    it("should be able to load the local asset of \"testscene\"", function() {
        this.timeout(15000);
        expect(() => { AssetManager.loadAsset(path.resolve(__dirname, "./testscene.json")); }).to.not.throw();
        expect(AssetManager.loadedAssets).to.not.be.undefined; 
        LogDebug(`${JSON.stringify(AssetManager.loadedAssets)}`);
        expect(AssetManager.getAsset("testscene")).to.not.be.undefined;
        expect(AssetManager.getAsset("testscene").name).to.equal("testscene");
    });
    it("should cleanup on shutdown call", () => {
        expect(AssetManager.instance).to.not.be.undefined;
        AssetManager.shutdown();
        expect(() => {AssetManager.instance; }).to.throw;
    });
    after(() => {
        Engine.shutdown();
    });
});