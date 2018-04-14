import "mocha";
import { expect } from "chai";
import { FlagComponent, Transform } from "../../src";

describe("Flag component unit testing", () => {
    var fc: FlagComponent = new FlagComponent(new Transform(0,0));
    it("should have a location", () => {
        expect(fc).to.have.property("location");
    });
    it("should be set to 0,0", () => {
        expect(fc.location).to.deep.equal({x:0, y:0});
    })
});