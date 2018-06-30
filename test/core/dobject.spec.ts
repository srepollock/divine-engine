import { expect } from "chai";
import "mocha";
import { DObject } from "../../src";

describe("DObject unit testing", () => {
    var obj: DObject = new DObject();
    describe("id testing: null", () => {
        it("should be able to have an empty id", () => {
            expect(obj.id).to.be.equal("");
        });
        it("should be able to set", () => {
            obj.id = "set";
            expect(obj.id).to.be.equal("set");
        });
        it("should be able to change", () => {
            obj.id = "new";
            expect(obj.id).to.be.equal("new");
        });
    });
    var obj2: DObject = new DObject("template");
    describe("id testing \"template\"", () => {
        it("should be initially set to \"template\"", () => {
            expect(obj2.id).to.be.equal("template");
        });
    });
});