import { readFileSync } from "fs";
import * as path from "path";
import { Engine, EngineArguments, DScene } from "../../src";

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
        // tslint:disable-next-line: max-line-length
        expect(Engine.instance!.sceneManager.addScene(Object.assign(new DScene(), JSON.parse(readFileSync(path.resolve(__dirname, "./assets/testscene.json"), "utf8"))))).toBe(true);
        expect(Engine.instance!.sceneManager.loadScene("testscene")).toBe(true);
        expect(Engine.scene.name).toBe("testscene");
    });
    it("should have removed the old scene", () => {
        let currentScene = Engine.scene;
        expect(Engine.instance!.sceneManager.removeScene("")).toBe(true);
        expect(Engine.scene.name).not.toBe("blankscene");
    });
    it("should be cleaned up on engine shutdown", () => {
        // TODO: this needs to do something...
    });
});