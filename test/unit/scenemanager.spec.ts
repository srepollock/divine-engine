import * as path from "path";
import { Engine, EngineArguments, SceneManager } from "../../lib/divine.es";

describe("SceneManager class unit tests", () => {
    var sm: SceneManager = new SceneManager();
    it("should be able to be created as empty", () => {
        expect(sm).toBeDefined();
    });
    it("should have an empty scene loaded initially", () => {
        expect(sm.scene).toBeDefined();
    });
    it("should unload the previous scene when loading the scene", () => {
        expect(sm.scene).toBeDefined(); // NOTE: The scene should be undefined from the previous test
        let scene = sm.scene;
        sm.loadScene(path.resolve(__dirname, "./assets/testscene.json"));
        expect(sm.scene).toBeDefined();
        expect(sm.scene.title).toBe("testscene");
        expect(sm.scene).not.toBe(scene); // NOTE: Does not equal the old scene.
    });
    describe("engine's scene manager", () => {
        beforeEach(() => {
            Engine.stop();
            Engine.shutdown();
            Engine.start(new EngineArguments());
        });
        it("should have loaded the blank scene for the engine on start", () => {
            expect(Engine.scene.title).toBe("");
        });
        it("should load a new scene", () => {
            Engine.instance.sceneManager.loadScene("testscene");
            expect(Engine.scene.title).toBe("testscene");
        });
        it("should have unloaded the old scene", () => {
            let currentScene = Engine.scene;
            Engine.instance.sceneManager.unloadScene("");
            expect(Engine.scene.title).not.toBe("blankscene");
        });
        it("should be cleaned up on engine shutdown", () => {
            // TODO: this needs to do something...
        });
    });
});