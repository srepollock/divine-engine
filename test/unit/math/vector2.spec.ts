import { Vector2 } from "../../../src/math";

describe("Vector2 Unit Tests", () => {
    let v: Vector2;
    beforeEach(() => {
        v = new Vector2(1, 2);
    });
    it("should default to 0,0", () => {
        let v2 = new Vector2();
        expect(v2.x).toBe(0);
        expect(v2.y).toBe(0);
    });
    it("should create a 1,2 vector", () => {
        expect(v.x).toBe(1);
        expect(v.y).toBe(2);
    });
    it("should add two vectors together", () => {
        let v2 = new Vector2(2, 2);
        v.add(v2);
        expect(v.x).toBe(3);
        expect(v.y).toBe(4);
    });
    it("should subtract a vector from a vector", () => {
        let v2 = new Vector2(2, 2);
        v.subtract(v2);
        expect(v.x).toBe(-1);
        expect(v.y).toBe(0);
    });
    it("should get the magnitude (length) of a vector", () => {
        expect(v.magnitude()).toBe(Math.sqrt(5));
    });
    it("should get the dot product of two vectors", () => {
        let v2 = new Vector2(2, 2);
        expect(v.dot(v2)).toBe(6);
    });
    it("should get the distnace between two vectors", () => {
        expect(Vector2.distance(new Vector2(1, 1), new Vector2(2, 2))).toEqual(1.4142135623730951);
    });
    it("should clone the vector given into the vector called on", () => {
        expect(new Vector2(2, 2).clone()).toEqual(new Vector2(2, 2));
    });
    it("should copy the vector given into the vector called on", () => {
        expect(new Vector2().copy(new Vector2(2, 2))).toEqual(new Vector2(2, 2));
    });
    it("should multiply the vector2 by the given vector2", () => {
        expect(new Vector2(1, 1).multiply(new Vector2(2, 2))).toEqual(new Vector2(2, 2));
    });
    it("should divide the vector2 by the given vector2", () => {
        expect(new Vector2(4, 4).divine(new Vector2(4, 4))).toEqual(new Vector2(1, 1))
    });
    it("should compare vector to the vector and get the equal value", () => {
        expect(new Vector2(2, -2).equals(new Vector2(2, -2))).toBeTruthy;
    });
    it("should scale the vector by the value", () => {
        expect(new Vector2(1, 1).scale(2)).toEqual(new Vector2(2, 2));
    });
    it("should set the value of a vector", () => {
        let m: Vector2 = new Vector2();
        m.set({x: 2, y: 2});
        expect(m).toEqual(new Vector2(2, 2));
    });
    it("should set the value of a vector", () => {
        let m: Vector2 = new Vector2();
        m.set();
        expect(m).toEqual(new Vector2());
    });
    it("should set from json", () => {
        let m: Vector2 = new Vector2();
        m.setFromJson(JSON.parse(`{"x": 2, "y": 2}`));
        expect(m).toEqual(new Vector2(2, 2));
    });
    it("should set from json", () => {
        let m: Vector2 = new Vector2();
        m.setFromJson(JSON.parse(`{}`));
        expect(m).toEqual(new Vector2(0, 0));
    });
    it("should get the vector as a number array", () => {
        expect(new Vector2(2, 2).toArray()).toEqual(new Array(2, 2));
    });
    it("should get the vector as a float32array", () => {
        expect(new Vector2(2, 2).toFloat32Array()).toEqual(new Float32Array([2, 2]));
    });
});