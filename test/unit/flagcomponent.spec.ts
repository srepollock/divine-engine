import "mocha";
import { FlagComponent, Transform } from "../../lib/divine.es";

describe("Flag component unit testing", () => {
    var fc = new FlagComponent(new Transform(0, 0));
    it("fc should have a location", () => {
        expect(fc).toHaveProperty("location");
    });
    it("fc should be set to 0,0", () => {
        expect(fc.location).toEqual({x: 0, y: 0});
    });
    it("fc should be the first flag at 1", () => {
        expect(fc.getFlagnumber()).toBe(1);
    });
    var fc2 = new FlagComponent(new Transform(0, 0));
    it("fc2 should be the second flag at 2", () => {
        expect(fc2.getFlagnumber()).toBe(2);
    });
});