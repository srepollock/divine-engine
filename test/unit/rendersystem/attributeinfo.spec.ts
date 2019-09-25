import { AttributeInfo } from "../../../src";

describe("AttributeInfo Unit Test", () => {
    let ai = new AttributeInfo(0, 1, 0);
    it("should have a location of 0", () => {
        expect(ai.location).toBe(0);
    });
    it("should have a size of 1", () => {
        expect(ai.size).toBe(1);
    });
    it("should have a offset of 0", () => {
        expect(ai.offset).toBe(0);
    });
});