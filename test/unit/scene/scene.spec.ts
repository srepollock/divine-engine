import { Scene, Entity } from "../../../src/";

describe("Scene unit tests", () => {
    let s = new Scene();
    it("should have a root entity object for the world", () => {
        expect(s.root).not.toBeUndefined;
    });
    it("should have the root object loaded", () => {
        expect(s.isLoaded).toBeTruthy;
    });
    it("should add an entity to the scene as a child of the root object", () => {
        expect(s.addEntity(new Entity({name: "child1"}))).toBeCalled;
    });
    it("should get an object by name in the scene", () => {
        expect(s.getObjectByName("child1")).toBeInstanceOf(Entity);
    });
    it("should not get an object by name that is not in the scene", () => {
        expect(s.getObjectByName("child2")).toBeUndefined;
    });
    // NOTE: Render and Update needs to be called in integration
});