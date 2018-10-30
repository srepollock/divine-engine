import { expect } from "chai";
import { AssetManager, Engine, EngineArguments } from "../../src";

describe("Asset Manager unit tests", () => {
    before(() => {
        Engine.start(new EngineArguments({debug: true}));
    });
    AssetManager.initialize();
    it("should intiiaize with no errors", () => {
        expect(AssetManager.instance).not.to.be.undefined;
    });
    it("should have 2 asset loaders (image and json) installed on initialization", () => {
        expect(AssetManager.loaders.length).to.equal(2);
    });
    it("should be able to load the local asset of \"testscene\"", () => {
        expect(() => { AssetManager.loadAsset("./testscene.json"); }).to.not.throw();
        expect(AssetManager.loadedAssets.length).to.equal(1); 
        expect(AssetManager.loadedAssets[0].name).to.equal("testscene.json");
    });
    after(() => {
        Engine.shutdown();
    });
});