import { DObject } from "../../../src/core";

describe("DObject Class Unit Tests", () => {
    describe("empty object instantiation", () => {
        var obj: DObject;
        beforeEach(() => {
            obj = new DObject();
        });
        it("should have an id", () => {
            expect(obj.id).toEqual(expect.stringMatching("[a-z0-9]{8}-[a-z0-9]{8}-[a-z0-9]{8}-[a-z0-9]{8}"));
        });
        it("should have no tag", () => {
            expect(obj.tag).toBe("");
        });
        it("should get the object as a message in JSON format", () => {
            expect(obj.asMessage()).toStrictEqual(JSON.stringify(obj));
        });
    });
    describe("filled out object instantiation", () => {
        var obj: DObject;
        beforeEach(() => {
            obj = new DObject("player");
        });
        it("should have an id of \"player \"", () => {
            expect(obj.tag).toBe("player");
        });
    });
});