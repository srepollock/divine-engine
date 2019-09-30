import { Entity, Matrix4, Vector3 } from "../../../src";

describe("Entity Unit Test", () => {
    let e = new Entity({name: "test"})
    it("should have an id", () => {
        expect(e.id).not.toBeUndefined;
    });
    it("should have a name", () => {
        expect(e.name).not.toBeUndefined;
    });
    it("should be visible", () => {
        expect(e.isVisible).toBeTruthy;
    });
    it("should be alive on start", () => {
        expect(e.isAlive).toBeTruthy;
    });
    it("should not have a parent", () => {
        expect(e.parent).toBeUndefined;
    });
    it("should get the local matrix", () => {
        expect(e.localMatrix).toBeInstanceOf(Matrix4);
    });
    it("should remove a component by name", () => {
        e.removeComponent("sprite")
    });
    
    describe("Functions based on parent", () => {
        it("should have a parent when set; by addding a child should remove a child when called", () => {
            let ee = new Entity({name: "test2"});
            ee.addChild(e);
            expect(e.parent).toBe(ee);
            ee.removeChild(e);
        });
        it("should get the world position based on parent", () => {
            expect(e.getWorldPosition()).toBeInstanceOf(Vector3);
        });
    });
    it("should set alive to false", () => {
        e.isAlive = false;
        expect(e.isAlive).toBeFalsy;
    });
    it("should be able to set isVisible to false", () => {
        e.isVisible = false;
        expect(e.isVisible).not.toBeTruthy;
    });
    it("should die when isAlive is false", () => {
        e.isAlive = false;
        e.update(0);
        expect(e.update).toBeFalsy;
    });
});