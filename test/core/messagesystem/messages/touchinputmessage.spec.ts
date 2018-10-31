import { expect } from "chai";
import { TouchInputMessage } from "../../../../src";
describe("Touch Input Message unit test", () => {
    it("should be initialized", () => {
        var message = new TouchInputMessage(11, 23);
        expect(message).to.not.be.undefined;
        expect(message.x).to.equal(11);
        expect(message.y).to.equal(23);
    });
});