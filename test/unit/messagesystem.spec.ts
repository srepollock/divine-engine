import { expect } from "chai";
import { Writable } from "stream";
import { Message, MessageSystem } from "../../src/index";

describe("Message system unit testing", () => {
    var messageSystem: MessageSystem;
    beforeEach(() => {
        messageSystem = new MessageSystem();
    });
    afterEach(() => {
        messageSystem.push(null);
    });
    it("should take a message as input and pipe it process.stdout", async () => {
        let m: Message = new Message("Hello world!");
        let ws = new Writable({
            objectMode: true,
            write(chunk, encoding, callback){
                console.log(chunk.toString());
            }
        });
        messageSystem.write(m);
        messageSystem.pipe(ws); // printing here
        ws.on("data", (data) => {
            expect(data).to.equal(m); // uid must be the same
        });
    });
    it("should take a maximum of 100 messages, but still parse all messages", async () => {
        let ws = new Writable({
            objectMode: true,
            write(chunk, encoding, callback){
                console.log(chunk.toString());
            }
        });
        for (var i = 0; i < 102; i++) {
            messageSystem.write(new Message(i.toString()));
        }
        messageSystem.pipe(ws); // printing here
        ws.on("data", (data) => {
            expect(data.data).to.be("number");
        });
    });
});