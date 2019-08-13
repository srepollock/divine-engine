import { expect } from "chai";
import { Message, MessageSystem, MessageType, SystemStream } from "../../src";

describe("Message system unit testing", () => {
    it("should take a message as input and pipe it process.stdout", async () => {
        var messageSystem: MessageSystem = new MessageSystem();
        let m: Message = new Message("Hello world!");
        messageSystem.write(m);
        messageSystem.pipe(process.stdout); // printing here
        process.stdout.on("data", (data) => {
            expect(Object.assign(new Message(), JSON.parse(data))).to.deep.equal(m);
        });
        messageSystem.end();
    });
    it("should take a maximum of 100 messages, but still parse all messages", async () => {
        var messageSystem: MessageSystem = new MessageSystem();
        for (var i = 0; i < 101; i++) {
            messageSystem.write(new Message(i.toString()));
        }
        messageSystem.pipe(process.stdout); // printing here
        process.stdout.on("data", (data) => {
            expect((data as Message).data).to.be.instanceof(Number);
            expect((data as Message).data).to.be.below(101);
        });
        messageSystem.end();
    });
    it("should only handle messages of the streams type in a system stream", async () => {
        var messageSystem: MessageSystem = new MessageSystem();
        let messageQueue: Array<Message> = new Array<Message>();
        class IOStream extends SystemStream {
            public type: MessageType = MessageType.IO;
            constructor() {
                super({messageQueueReference: messageQueue});
            }
        }
        let iostream = new IOStream();
        messageSystem.write(new Message("IO message only", MessageType.IO, true));
        messageSystem.pipe(iostream).pipe(process.stdout);
        iostream.on("data", (data) => {
            expect(messageQueue.length).to.eq(1);
            expect(messageQueue[0].type).to.eq(MessageType.IO);
            expect(messageQueue[0].data).to.eq("IO message only");
        });
        messageSystem.end();
    });
});