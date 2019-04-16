import { expect } from "chai";
import { Message, MessageSystem } from "../../src";

describe("Message system unit testing", () => {
    var messageSystem: MessageSystem;
    beforeEach(() => {
        messageSystem = new MessageSystem();
    });
    afterEach(() => {
        messageSystem.push(null);
    });
    after(() => {
        messageSystem.end();
    });
    it("should take a message as input and pipe it process.stdout", async () => {
        let m: Message = new Message("Hello world!");
        messageSystem.write(m);
        messageSystem.pipe(process.stdout); // printing here
        process.stdout.on("data", (data) => {
            expect(data).to.equal(m); // uid must be the same
        });
    });
    it("should take a maximum of 100 messages, but still parse all messages", async () => {
        for (var i = 0; i < 101; i++) {
            messageSystem.write(new Message(i.toString()));
        }
        messageSystem.pipe(process.stdout); // printing here
        process.stdout.on("data", (data) => {
            expect((data as Message).data).to.be("number");
            expect((data as Message).data).to.be.below(101);
        });
    });
});