import { expect } from "chai";
import { DScene } from "../../src";

describe("Scene unit testing", () => {
    it("should have a title when created with \"temp\" as a parameter", () => {
        let scene = new DScene("temp");
        expect(scene.title).to.equal("temp");
    });
    it("should create a three.js scene", () => {

    });
    it("should");
    it("should have a title of blankscene loaded for the basic scene", () => {

    });
});