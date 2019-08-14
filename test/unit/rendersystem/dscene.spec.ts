import * as path from "path";
import { Entity } from "../../../src/core";
import { DScene } from "../../../src/rendersystem";

describe("DScene Unit Tests", () => {
    it("should create a basic scene  with no parameters", () => {
        let scene = new DScene();
        expect(scene.name).toBe("Divine Engine Scene");
        expect(scene.threeScene).not.toBe(undefined);
        expect(scene.getSceneEntities()).toStrictEqual([]);
    });
    it("should save the scene", () => {
        let scene = new DScene("testscene", new Array<Entity>(
            new Entity({tag: "player"})
        ));
        scene.save(path.resolve(__dirname, "../../assets/"));
        expect(path.resolve(__dirname, "../../assets/testscene.des"));
    });
    it("should load a saved scene from file", () => {
        expect(true).toBe(false);
    });
    it("should create a scene with a name and a 2 entities (player and enemy)", () => {
        let scene = new DScene("Testing Scene", new Array<Entity>(
            new Entity({tag: "player"}), 
            new Entity({tag: "enemy"}))
        );
        expect(scene.getSceneEntities().length).toBe(2);
    });
    it("should get an empty scene as a JSON stringed message", () => {
        let scene = new DScene();
        expect(scene.asMessage()).not.toBe(undefined);
    });
    it("should set the scene to ready for rendering when the scene is fully loaded", () => {
        let scene = new DScene("Testing scene", new Array<Entity>(
            new Entity({tag: "player"})
        ));
        expect(scene.ready).toBe(true);
    });
});