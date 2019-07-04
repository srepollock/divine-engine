import { expect } from "chai";
import "mocha";
import { FlagComponent, Transform } from "../../lib/divine.cjs";

describe("Flag component unit testing", () => {
    var fc = new FlagComponent(new Transform(0, 0));
    it("fc should have a location", () => {
        expect(fc).to.have.property("location");
    });
    it("fc should be set to 0,0", () => {
        expect(fc.location).to.deep.equal({x: 0, y: 0});
    });
    it("fc should be the first flag at 1", () => {
        expect(fc.getFlagnumber()).to.equal(1);
    });
    var fc2 = new FlagComponent(new Transform(0, 0));
    it("fc2 should be the second flag at 2", () => {
        expect(fc2.getFlagnumber()).to.equal(2);
    });
});