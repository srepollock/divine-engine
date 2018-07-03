import { expect } from "chai";
import "mocha";
import { EventType, Message, MessageSystem, MouseInputMessage, PhysicsSystemMessage } from "../../src";

describe("Message System unit testing", () => {
    function messageDataVariableSave(message: Message) {
        data = message.data;
    }
    it("should add 3 new listeners", () => {
        var messageSystem = new MessageSystem();
        messageSystem.on(EventType.PhysicsSystem, messageDataVariableSave);
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        messageSystem.on(EventType.SoundSystem, messageDataVariableSave);
        expect(messageSystem.eventNames()).to.have.length(3);
    });
    it("is receiving render messages and emitting render messages", () => {
        var messageSystem = new MessageSystem();
        var data: string = "";
        messageSystem.on(EventType.IOSystem, messageDataVariableSave);
        messageSystem.emit(EventType.IOSystem, 
            new Message(new MouseInputMessage(1, 1)));
        expect(data).to.equal(new MouseInputMessage(1, 1).getJSON());
        messageSystem.emit(EventType.RenderSystem, 
            new Message(new MouseInputMessage(2, 4)));
        messageSystem.emit(EventType.RenderSystem, 
            new Message(new MouseInputMessage(81, 81)));
        expect(data).to.equal(new MouseInputMessage(81, 81).getJSON());
    });
    it("is receiving render messages and emitting physics messages", () => {
        var messageSystem = new MessageSystem();
        var data: string = "";
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        messageSystem.emit(EventType.PhysicsSystem, 
            new Message(new PhysicsSystemMessage("1")));
        expect(data).to.equal("");
    });
    it("should get all listeners in the system", () => {
        var messageSystem = new MessageSystem();
        messageSystem.on(EventType.Entity, messageDataVariableSave);
        messageSystem.on(EventType.ErrorSystem, messageDataVariableSave);
        messageSystem.on(EventType.IOSystem, messageDataVariableSave);
        messageSystem.on(EventType.KeyInput, messageDataVariableSave);
        messageSystem.on(EventType.MouseInput, messageDataVariableSave);
        messageSystem.on(EventType.PhysicsSystem, messageDataVariableSave);
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        messageSystem.on(EventType.TouchInput, messageDataVariableSave);
        messageSystem.on(EventType.SoundSystem, messageDataVariableSave);
        expect(messageSystem.allListenersCount()).to.equal(9);
    });
    it("can remove all listeners of 1", () => {
        var messageSystem = new MessageSystem();
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        expect(messageSystem.listenerCount(EventType.RenderSystem)).to.equal(1);
        messageSystem.removeAllListeners();
        expect(messageSystem.listenerCount(EventType.RenderSystem)).to.equal(0);
    });
    it("can remove all listeners of 2, same event type", () => {
        var messageSystem = new MessageSystem();
        var data: string = "";
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        expect(messageSystem.listenerCount(EventType.RenderSystem)).to.equal(2);
        messageSystem.removeAllListeners();
        expect(messageSystem.listenerCount(EventType.RenderSystem)).to.equal(0);
    });
    it("can remove 1 listener of 1", () => {
        var messageSystem = new MessageSystem();
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        expect(messageSystem.listenerCount(EventType.RenderSystem)).to.equal(1);
        messageSystem.removeListener(EventType.RenderSystem, 
            messageDataVariableSave);
        // DEBUG: This is erroring
        expect(messageSystem.listenerCount(EventType.RenderSystem)).to.equal(0);
    });
    it("can remove 1 listener of 2 same event type", () => {
        var messageSystem = new MessageSystem();
        var data: string = "";
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        expect(messageSystem.listenerCount(EventType.RenderSystem)).to.equal(2);
        messageSystem.removeListener(EventType.RenderSystem, 
            messageDataVariableSave); 
        // DEBUG: This is errroring
        expect(messageSystem.listenerCount(EventType.RenderSystem)).to.equal(1);
    });
    it("can remove 1 listener of 3, different even type", () => {
        var messageSystem = new MessageSystem();
        var data: string = "";
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        messageSystem.on(EventType.Entity, messageDataVariableSave);
        messageSystem.on(EventType.PhysicsSystem, (messageDataVariableSave));
        expect(messageSystem.allListenersCount()).to.equal(3);
        messageSystem.removeListener(EventType.Entity, messageDataVariableSave);
        expect(messageSystem.allListenersCount()).to.equal(2);
    });
    it("can remove all listeners of one event type of two even types", () => {
        var messageSystem = new MessageSystem();
        var data: string = "";
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
        messageSystem.on(EventType.PhysicsSystem, messageDataVariableSave);
        expect(messageSystem.allListenersCount()).to.equal(3);
        messageSystem.removeAllListeners(EventType.RenderSystem);
        expect(messageSystem.allListenersCount()).to.equal(1);
    });

    it("should get messages as a string object", () => {
        var messageSystem = new MessageSystem();
        
    });
});