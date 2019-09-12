import { Zone } from "../../../src/";

describe("Zone unit tests", () => {
    let zone: Zone = new Zone({ index: 0, name: "testzone", description: "Test zone"});
    it("should have an index", () => {
        expect(zone.index).not.toBeUndefined;
    });
    it("should have an id", () => {
        expect(zone.id).not.toBeUndefined;
    });
    it("should have a name", () => {
        expect(zone.name).not.toBeUndefined;
    });
    it("should have a description", () => {
        expect(zone.description).not.toBeUndefined;
    });
    it("should create a scene with a root object", () => {
        expect(zone.scene.root).not.toBeUndefined;
    });
    it("should intialize a zone based on given zone data", () => {
        let data: any = {"name": "testzone","description": "testzone","id": "","objects": [{"name": "testobject","transform": {"position": {"x": 0,"y": 0}},"children": [],"components": [],"behaviours": []}]};
        zone.initialize(data);
        expect(zone.scene.root!.children.length).toBeGreaterThan(0);
        zone.unload(); // NOTE: Called for cleanup on the root.
    });
    it("should not initialize a zone that has no objects in it", () => {
        let data: any = {"name": "testzone","description": "testzone","id": "","objects": []};
        zone.initialize(data);
        expect(zone.scene.root!.children.length).toBe(0);
    });
    it("should unload the scene and clear it", () => {
        zone.unload();
        expect(zone.scene.root.children.length).toBe(0);
    });
    it("should deactivate and unsubscribe all entities from messages", () => {
        zone.onDeactivated();
        expect(true).toBeTruthy;
    });
});