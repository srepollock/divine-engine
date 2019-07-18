import { DObject } from "../../../src";
import { Component } from "../../../src/components/component";


describe("Component Unit Test", () => {
    it("should be an instance of DObject", () => {
        expect(new Component()).toBeInstanceOf(DObject);
    });
    it("should have an empty tag", () => {
        expect(new Component().tag).toBe("");
    });
});