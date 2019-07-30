import { Color } from "../../../src/helper";

describe("Color Unit Tests", () => {
    it("should create the black color by default", () => {
        expect(new Color()).toEqual({r: 0.0, g: 0.0, b: 0.0, a: 0.0});
    });
    it("should create 1.0, 1.0, 1.0, 1.0 when parameters are given", () => {
        expect(new Color(1.0, 1.0, 1.0)).toEqual({r: 1.0, g: 1.0, b: 1.0, a: 0.0});
    });
});