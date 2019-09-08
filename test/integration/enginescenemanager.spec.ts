import { readFileSync } from "fs";
import * as path from "path";
import { Engine, EngineArguments } from "../../src/core";
import { DScene, SceneManager } from "../../src/rendersystem";

describe("engine's scene manager", () => {
    beforeEach(() => {
        Engine.stop();
        Engine.shutdown();
        Engine.start(new EngineArguments());
    });
    it("should have loaded the blank scene for the engine on start", () => {
        expect(Engine.scene.name).toBe("Defualt DScene Template");
    });
    it("should load a new scene", () => {
        expect(Engine.instance!.sceneManager.addScene(Object.assign(new DScene(), 
            JSON.parse(readFileSync(path.resolve(__dirname, "./assets/testscene.json"), "utf8"))))).toBe(true);
        expect(Engine.instance!.sceneManager.loadScene("testscene")).toBe(true);
        expect(Engine.scene.name).toBe("testscene");
    });
    it("should add the \"blankscene\" testing scene and remove the \"Default DScene Template\"", () => {
        Engine.instance!.sceneManager.addScene(SceneManager.createEmptyScene());
        expect(Engine.instance!.sceneManager.removeScene("Default DScene Template")).toBe(true);
        expect(Engine.instance!.sceneManager.loadScene("Default DScene Template")).toBe(false);
        expect(Engine.instance!.scene.name).toBe("blankscene");
    });
    it("should be cleaned up on engine shutdown", () => {
        // TODO: this needs to do something...
        expect(true).toBe(false);
    });
});