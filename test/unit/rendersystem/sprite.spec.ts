import { Sprite } from "../../../src";

describe("Sprite Unit Tests", () => {
    let sprite = new Sprite("temp", "temp");
    it("should create a sprite", () => {
        expect(sprite).not.toBeUndefined;
    });
    it("should have a name", () => {
        expect(sprite.name).toBe("temp");
    });
    it("should have an origin of 0.5,0.5", () => {
        expect(sprite.origin.x).toBe(0.5);
        expect(sprite.origin.y).toBe(0.5);
    });
    it("should have a height and width", () => {
        expect(sprite.width).toBe(100);
        expect(sprite.height).toBe(100);
    });
});