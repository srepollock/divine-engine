import { expect } from "chai";
import "mocha";
import { IOSystemMessage, Message } from "../../src";

describe("Message unit testing", () => {
    describe("Empty messages", () => {
        var msg1: Message = new Message(new IOSystemMessage());
        it("should have no data", () => {
            expect(msg1.data).to.equal(new IOSystemMessage().getJSON());
        });
    });
});