import { UVInfo } from "../../../src";

describe("UV Info Unit Tests", () => {
    it("should hav a min and max", () => {
        let uv = new UVInfo(1, 1);
        expect(uv.min).toBe(1);
        expect(uv.max).toBe(1);
    });
});