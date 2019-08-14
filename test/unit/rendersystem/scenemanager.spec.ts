import { readFileSync } from "fs";
import * as path from "path";
import { DScene, SceneManager } from "../../../src/rendersystem";

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
        expect(sm.addScene(Object.assign(new DScene(), JSON.parse(readFileSync(path.resolve(__dirname, 
            "../../assets/testscene.des"), "utf8"))))).toBe(true);
        expect(sm.loadScene("testscene")).toBe(true);
        expect(sm.scene.name).toBe("testscene");
        expect(sm.scene).not.toBe(scene);
    });
    it("should be able to create a scene", () => {
        let scene = sm.createScene();
        expect(typeof(scene)).toBeInstanceOf(typeof(new DScene()));
        expect(scene.name).toBe("Divine Engine Scene");
        expect(scene.getSceneEntities().length).toBe(1);
        expect(scene.getSceneEntities()[0].tag).toBe("box");
    });
    it("should be able to create an empty scene", () => {
        let scene = sm.createEmptyScene();
        expect(typeof(scene)).toBe(typeof(new DScene()));
        expect(scene.name).toBe("Default DScene Template");
    });
});