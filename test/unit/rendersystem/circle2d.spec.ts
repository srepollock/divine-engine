import { Circle2D } from "../../../src";

describe("Circle2D Unit Test", () => {
    let c = new Circle2D();
    c.setFromJson(JSON.parse(JSON.stringify({
        position: {
            x: 1,
            y: 1
        },
        origin: {
            x: 1,
            y: 1
        },
        radius: 1
    })));
    it("should have a radius of 1", () => {
        expect(c.radius).toBe(1);
    });
    it("should have a position of 1, 1", () => {
        expect(c.position.x).toBe(1);
        expect(c.position.y).toBe(1);
    });
    it("should have a origin of 1, 1", () => {
        expect(c.origin.x).toBe(1);
        expect(c.origin.y).toBe(1);
    });
    it("should intersect with a circle in the same position", () => {
        let cc = new Circle2D();
        cc.setFromJson(JSON.parse(JSON.stringify({
            position: {
                x: 1,
                y: 1
            },
            origin: {
                x: 1,
                y: 1
            },
            radius: 1
        })));
        expect(c.intersect(cc)).toBeTruthy;
    });
    it("should not intersect with a circle outside the position", () => {
        let cc = new Circle2D();
        cc.setFromJson(JSON.parse(JSON.stringify({
            position: {
                x: 3,
                y: 1
            },
            origin: {
                x: 1,
                y: 1
            },
            radius: 1
        })));
        expect(c.intersect(cc)).toBeFalsy;
    });
});