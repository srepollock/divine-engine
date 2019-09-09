import { Vertex, Vector3, Vector2 } from "../../../src/math";

describe("Vector3 Unit Tests", () => {
    it("should create an empy vertex", () => {
        expect(new Vertex().position).toEqual(new Vector3());
        expect(new Vertex().texCoords).toEqual(new Vector2());
    });
    it("should get everything as an array of numbers", () => {
        expect(new Vertex().toArray()).toEqual(new Array(0, 0, 0, 0, 0));
    });
    it("should get everything as a float32array", () => {
        expect(new Vertex().toFloat32Array()).toEqual(new Float32Array([0, 0, 0, 0, 0]));
    });
});