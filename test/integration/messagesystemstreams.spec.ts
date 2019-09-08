import { Message, MessageSystem, MessageType } from "../../src/core/messagesystem";
import { EngineStream, IOStream } from "../../src/core/streams";

describe("Message system, EngineStream and IOStream incrementals tests", () => {
    var messageSystem: MessageSystem = new MessageSystem();
    let eMessageQueue = new Array<Message>();
    let iMessageQueue = new Array<Message>();
    var engineStream: EngineStream = new EngineStream({messageQueueReference: eMessageQueue});
    var ioStream: IOStream = new IOStream({messageQueueReference: iMessageQueue});
    beforeEach(() => {
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
        messageSystem.emit("close");
        messageSystem = new MessageSystem();
        engineStream = new EngineStream({messageQueueReference: eMessageQueue});
        ioStream = new IOStream({messageQueueReference: iMessageQueue});
    });
    afterEach(() => {
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
    });
    it("should take input from the message stream", () => {
        messageSystem.write(new Message("Something cool"));
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data)).toBeDefined();
            expect(engineStream.fromJSON(data).data).toBeDefined();
        });
        messageSystem.pipe(engineStream);
        messageSystem.removeAllListeners();
    });
    it("should take global message types", () => {
        messageSystem.write(new Message("Something cool", MessageType.Global));
        messageSystem.pipe(engineStream);
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data).data).toBe("Something cool");
            expect(engineStream.fromJSON(data).data).toBe(MessageType.Global);
        });
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
    });
    it("should take messages of the engine type and continue passing them when not-single", () => {
        messageSystem.write(new Message("Something only for Engines", MessageType.Engine));
        messageSystem.pipe(engineStream);
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data).data).toBe("Something only for Engines");
            expect(engineStream.fromJSON(data).type).toBe(MessageType.Engine);
        });
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
    });
    it("should not take io messages with only an engine pipe stream", () => {
        messageSystem.write(new Message("Something only for IO", MessageType.IO, true));
        messageSystem.write(new Message("Something only for Engines", MessageType.Engine, true));
        messageSystem.pipe(engineStream);
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data).type).toBe(MessageType.Engine);
        });
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
    });
    it("should remove single Engine or IO messages", () => {
        messageSystem.write(new Message("Something for Engines only", MessageType.Engine, true));
        messageSystem.pipe(engineStream).pipe(ioStream);
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data).type).toBe(MessageType.Engine);
        });
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
    });
    it("should not remove non-single (global) Engine or IO messages", () => {
        messageSystem.write(new Message("Something for Engines only", MessageType.Engine));
        messageSystem.pipe(engineStream).pipe(ioStream);
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data).type).toBe(MessageType.Engine);
        });
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
    });
});