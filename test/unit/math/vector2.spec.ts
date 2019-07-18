import { Vector2 } from "../../../src/math";

describe("", () => {
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
});