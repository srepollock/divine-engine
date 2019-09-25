import { UVInfo, Vector2 } from "../../../src";

describe("UV Info Unit Tests", () => {
    it("should hav a min and max", () => {
        let uv = new UVInfo(new Vector2(1, 1), new Vector2(2, 2));
        expect(uv.min).toStrictEqual(new Vector2(1, 1));
        expect(uv.max).toStrictEqual(new Vector2(2, 2));
    });
});