import { expect } from "chai";
import * as path from "path";
import { Engine, EngineArguments, SceneManager } from "../../lib/divine.es";

describe("SceneManager class unit tests", () => {
    var sm: SceneManager = new SceneManager();
    it("should be able to be created as empty", () => {
        expect(sm).to.not.be.undefined;
    });
    it("should have an empty scene loaded initially", () => {
        expect(sm.scene).to.not.be.undefined;
    });
    it("should unload the previous scene when loading the scene", () => {
        expect(sm.scene).to.not.be.undefined; // NOTE: The scene should be undefined from the previous test
        let scene = sm.scene;
        sm.loadScene(path.resolve(__dirname, "./assets/testscene.json"));
        expect(sm.scene).to.not.be.undefined;
        expect(sm.scene.title).to.equal("testscene");
        expect(sm.scene).to.not.equal(scene); // NOTE: Does not equal the old scene.
    });
    describe("engine's scene manager", () => {
        before(() => {
            Engine.stop();
            Engine.shutdown();
            Engine.start(new EngineArguments());
        });
        it("should have loaded the blank scene for the engine on start", () => {
            expect(Engine.scene.title).to.equal("");
        });
        it("should load a new scene", () => {
            Engine.instance.sceneManager.loadScene("testscene");
            expect(Engine.scene.title).to.equal("testscene");
        });
        it("should have unloaded the old scene", () => {
            let currentScene = Engine.scene;
            Engine.instance.sceneManager.unloadScene("");
            expect(Engine.scene.title).to.not.equal("blankscene");
        });
        it("should be cleaned up on engine shutdown", () => {
            // TODO: this needs to do something...
        });
    });
});