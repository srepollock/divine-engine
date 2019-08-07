import { DObject } from "../../../src";
import { Component } from "../../../src/components/component";

describe("Component Unit Test", () => {
    it("should be an instance of DObject", () => {
        expect(new Component()).toBeInstanceOf(DObject);
    });
    it("should have a tag set to \"component\"", () => {
        expect(new Component().tag).toBe("component");
    });
});