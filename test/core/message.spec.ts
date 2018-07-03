import { expect } from "chai";
import "mocha";
import { IOSystemMessage, Message } from "../../src";

describe("Message unit testing", () => {
    describe("Empty messages", () => {
        var msg1: Message = new IOSystemMessage("1");
        it("should have no data", () => {
            expect(msg1.JSONString).to.equal(
                new IOSystemMessage("1").JSONString);
        });
    });
});