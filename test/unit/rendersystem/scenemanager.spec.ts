import { readFileSync } from "fs";
import * as path from "path";
import { DScene, Engine, EngineArguments, SceneManager } from "../../../src";

describe("SceneManager Unit Tests", () => {
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
        // tslint:disable-next-line: max-line-length
        expect(sm.addScene(Object.assign(DScene, JSON.parse(readFileSync(path.resolve(__dirname, "../../assets/testscene.json"), "utf8"))))).toBe(true);
        // tslint:disable-next-line: max-line-length
        expect(sm.loadScene("testscene")).toBe(true);
        expect(sm.scene.name).toBe("testscene");
        expect(sm.scene).not.toBe(scene); // NOTE: Does not equal the old scene.
    });
});