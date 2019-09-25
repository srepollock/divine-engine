import { Color } from "../../../src";

describe("Color Unit Test", () => {
    it("should check r, g, b, a on white to be 255", () => {
        expect(Color.white.r).toMatchObject(255);
        expect(Color.white.g).toMatchObject(255);
        expect(Color.white.b).toMatchObject(255);
        expect(Color.white.a).toMatchObject(255);
    });
    it("should return a static white color", () => {
        expect(Color.white).toMatchObject({"_r": 255, "_g": 255, "_b": 255, "_a": 255});
    });
    it("should return a static red color", () => {
        expect(Color.red).toMatchObject({"_r": 255, "_g": 0, "_b": 0, "_a": 255});
    });
    it("should return a static blue color", () => {
        expect(Color.green).toMatchObject({"_r": 0, "_g": 255, "_b": 0, "_a": 255});
    });
    it("should return a static green color", () => {
        expect(Color.blue).toMatchObject({"_r": 0, "_g": 0, "_b": 255, "_a": 255});
    });
    it("should return a static black color", () => {
        expect(Color.black).toMatchObject({"_r": 0, "_g": 0, "_b": 0, "_a": 255});
    });
    it("should get an array of numbers", () => {
        expect(Color.white.toArray()).toStrictEqual([255, 255, 255, 255]);
    });
    it("should get a float array", () => {
        expect(Color.white.toFloatArray()).toStrictEqual([Color.white.rFloat, Color.white.gFloat, Color.white.bFloat, Color.white.aFloat]);
    });
    it("should get a float32 array", () => {
        expect(Color.white.toFloat32Array()).toStrictEqual(new Float32Array([Color.white.rFloat, Color.white.gFloat, Color.white.bFloat, Color.white.aFloat]));
    });
});