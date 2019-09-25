import { Entity } from "../../../src";

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
    it("should be able to set isVisible to false", () => {
        e.isVisible = false;
        expect(e.isVisible).not.toBeTruthy;
    });
});