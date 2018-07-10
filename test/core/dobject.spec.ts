import { expect } from "chai";
import "mocha";
import { DObject } from "../../src";

describe("DObject unit testing", () => {
    var obj: DObject;
    describe("empty object instantiation", () => {
        beforeEach(() => {
            obj = new DObject();
        });
        it("should have an id", () => {
            expect(obj.id).to.not.equal("");
        });
        it("should have no tag", () => {
            expect(obj.tag).to.equal("");
        });
    });
    describe("", () => {
        beforeEach(() => {
            obj = new DObject("player");
        });
        it("should have an id of \"player \"", () => {
            expect(obj.tag).to.equal("player");
        });
    });
});