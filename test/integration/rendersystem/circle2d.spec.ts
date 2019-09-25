import { Circle2D, Rectangle2D } from "../../../src";

describe("Circle2D Integration Test", () => {
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
    })))
    it("should check if it intersects with a rectangle", () => {
        let s = new Rectangle2D();
        s.setFromJson(JSON.parse(JSON.stringify({
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
        expect(c.intersect(s)).toBeTruthy;
    });
});