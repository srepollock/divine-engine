import { expect } from "chai";
import { EngineStream, IOStream, Message, MessageSystem, MessageType, PhysicsStream, RenderStream, SoundStream } from "../../src";

describe("Message system, EngineStream and IOStream incrementals tests", () => {
    var messageSystem: MessageSystem = new MessageSystem();
    var engineStream: EngineStream = new EngineStream();
    var ioStream: IOStream = new IOStream();
    var physicsStream: PhysicsStream = new PhysicsStream();
    var renderStream: RenderStream = new RenderStream();
    var soundStream: SoundStream = new SoundStream();
    beforeEach(() => {
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
        physicsStream.removeAllListeners();
        renderStream.removeAllListeners();
        soundStream.removeAllListeners();
        messageSystem.emit("close");
        messageSystem = new MessageSystem();
        engineStream = new EngineStream();
        ioStream = new IOStream();
        physicsStream = new PhysicsStream();
        renderStream = new RenderStream();
        soundStream = new SoundStream();
    });
    afterEach(() => {
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
        physicsStream.removeAllListeners();
        renderStream.removeAllListeners();
        soundStream.removeAllListeners();
    });
    it("should take input from the message stream", () => {
        messageSystem.write(new Message("Something cool"));
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data)).to.not.be.undefined;
            expect(engineStream.fromJSON(data).data).to.not.be.undefined;
        });
        messageSystem.pipe(engineStream);
        messageSystem.removeAllListeners();
    });
    it("should take global message types", () => {
        messageSystem.write(new Message("Something cool", MessageType.Global));
        messageSystem.pipe(engineStream);
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data).data).to.equal("Something cool");
            expect(engineStream.fromJSON(data).data).to.equal(MessageType.Global);
        });
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
        physicsStream.removeAllListeners();
        renderStream.removeAllListeners();
        soundStream.removeAllListeners();
    });
    it("should take messages of the engine type and continue passing them when not-single", () => {
        messageSystem.write(new Message("Something only for Engines", MessageType.Engine));
        messageSystem.pipe(engineStream);
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data).data).to.equal("Something only for Engines");
            expect(engineStream.fromJSON(data).type).to.equal(MessageType.Engine);
        });
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
        physicsStream.removeAllListeners();
        renderStream.removeAllListeners();
        soundStream.removeAllListeners();
    });
    it("should not take io messages with only an engine pipe stream", () => {
        messageSystem.write(new Message("Something only for IO", MessageType.IO, true));
        messageSystem.write(new Message("Something only for Engines", MessageType.Engine, true));
        messageSystem.pipe(engineStream);
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data).type).to.equal(MessageType.Engine);
        });
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
        physicsStream.removeAllListeners();
        renderStream.removeAllListeners();
        soundStream.removeAllListeners();
    });
    it("should remove single Engine or IO messages", () => {
        messageSystem.write(new Message("Something for Engines only", MessageType.Engine, true));
        messageSystem.write(new Message("Something for Sound only", MessageType.Sound, true));
        messageSystem.pipe(engineStream).pipe(physicsStream).pipe(soundStream);
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data).type).to.equal(MessageType.Engine);
        });
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
        physicsStream.removeAllListeners();
        renderStream.removeAllListeners();
        soundStream.removeAllListeners();
    });
    it("should not remove non-single (global) Engine or IO messages", () => {
        messageSystem.write(new Message("Something for Engines only", MessageType.Engine));
        messageSystem.write(new Message("Something for Renders only", MessageType.Render, true));
        messageSystem.pipe(engineStream).pipe(renderStream);
        engineStream.on("data", (data) => {
            expect(engineStream.fromJSON(data).type).to.equal(MessageType.Engine);
        });
        messageSystem.removeAllListeners();
        engineStream.removeAllListeners();
        ioStream.removeAllListeners();
        physicsStream.removeAllListeners();
        renderStream.removeAllListeners();
        soundStream.removeAllListeners();
    });
});