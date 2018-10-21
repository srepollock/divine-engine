import { expect } from "chai";
import "mocha";
import { EntityMessage, EventType, Message, MessageSystem, MouseInputMessage, PhysicsSystemMessage, RenderComponent, RenderSystemMessage, TestMessage } from "../../src";

describe("Message System unit testing", () => {
    describe("Messages", () => {
        it("should be able to be created empty", () => {
            let message: Message = new Message();
            expect(message.JSONString).to.equal(`{"_id":${message.id}}`);
        });
        it("should take multiple strings of data as input", () => {
            let message: TestMessage = new TestMessage("1");
            expect(message.JSONString).to.equal(`{"_id":${message.id},"data":"${message.data}"}`);
        });
        it("should save data as a string in JSON format", () => {
            let message: TestMessage = new TestMessage("1");
            expect(message).to.haveOwnProperty("data");
        });
        it("should export as a JSON string", () => {
            let message: TestMessage = new TestMessage("1");
            expect(message.JSONString).to.equal(`{"_id":${message.id},"data":"${message.data}"}`);
        });
        it("should export as a JSON object", () => {
            let message: TestMessage = new TestMessage("1");
            expect(message.JSON).to.be.a("Object");
        });
        it("should be able to get properties of TestMessage", () => {
            let message: TestMessage = new TestMessage("100");
            expect(message.id).to.equal("100");
        });
        it("should be able to get the properties of a RenderMessage", () => {
            let rc: RenderComponent = new RenderComponent("1");
            let message: RenderSystemMessage = new RenderSystemMessage(rc);
            expect(message.renderableComponent).to.deep.equal(rc);
        });
        it("should be able to get the properties of a PhysicsMessage", () => {
            let message: PhysicsSystemMessage = new PhysicsSystemMessage();
            expect(message.id).to.equal("1");
        });
        it("should be able to get properties of MouseInputMessage", () => {
            let message: MouseInputMessage = new MouseInputMessage(11, 23);
            expect(message.x).to.equal(11);
            expect(message.y).to.equal(23);
        });
    });
    describe("Message system", () => {
        var data: string = "";
        var data2: string = "";
        function messageDataVariableSave(message: Message) {
            data = message.JSONString;
        }
        function messageDataVariableSave2(message: Message) {
            data2 = message.JSONString;
        }
        beforeEach(() => {
            MessageSystem.initialize();
        });
        afterEach(() => {
            data = "";
            data2 = "";
            MessageSystem.shutdown();
        });
        it("should add new listener of EventType.RenderSystem", () => {
            MessageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            expect(messageSystem.listenerCount(EventType.RenderSystem)).to
                .equal(1);
        });
        it("should add 3 new listeners of the same EventType.RenderSystem", 
            () => {
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            expect(messageSystem.listenerCount(EventType.RenderSystem))
                .to.equal(3);
        });
        it("should add 3 new listeners of different types", () => {
            
            messageSystem.on(EventType.PhysicsSystem, messageDataVariableSave);
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.on(EventType.SoundSystem, messageDataVariableSave);
            expect(messageSystem.eventNames()).to.have.length(3);
        });
        it("should add 5 different listeners and remove 1 listener of differnt types", () => {
            messageSystem.on(EventType.PhysicsSystem, messageDataVariableSave);
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.on(EventType.IOSystem, messageDataVariableSave);
            messageSystem.on(EventType.Entity, messageDataVariableSave);
            messageSystem.on(EventType.ErrorSystem, messageDataVariableSave);
            messageSystem.removeListener(EventType.PhysicsSystem, 
                messageDataVariableSave);
            expect(messageSystem.allListenersCount()).to.equal(4);
        });
        it("should get all listeners in the system", () => {
            
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
        // TODO: Fix this
        it("is receiving render messages and emitting render messages", () => {
            
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.emit(EventType.RenderSystem, new MouseInputMessage(1, 1));
            expect(data).to.not.equal(new MouseInputMessage(1, 1).JSONString);
            messageSystem.emit(EventType.RenderSystem, new MouseInputMessage(2, 4));
            messageSystem.emit(EventType.RenderSystem, new MouseInputMessage(81, 81));
            expect(data).to.not.equal(new MouseInputMessage(81, 81).JSONString);
        });
        it("is receiving render messages and emitting physics messages", () => {
            
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.emit(EventType.PhysicsSystem, new PhysicsSystemMessage());
            expect(data).to.equal("");
        });
        // TODO: Fix this
        it("should send 2 types (EventType.MouseInputMessage and EventType.Entity) and receive only EventType.Entity", 
            () => {
            messageSystem.on(EventType.Entity, messageDataVariableSave);
            messageSystem.emit(EventType.Entity, new EntityMessage());
            expect(data).to.equal(new EntityMessage().JSONString);
            messageSystem.emit(EventType.IOSystem, new MouseInputMessage(10, 10));
            expect(data).to.not.equal(new MouseInputMessage(10, 10).JSONString);
        });
        it("should send and receive a message of EventType.Entity to two entity listeners", () => {
            messageSystem.on(EventType.Entity, messageDataVariableSave);
            messageSystem.on(EventType.Entity, messageDataVariableSave2);
            messageSystem.emit(EventType.Entity, new EntityMessage());
            expect(data).to.not.equal(new EntityMessage().JSONString);
            expect(data2).to.not.equal(new EntityMessage().JSONString);
        });
        it("can remove all listeners of 1", () => {
            
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            expect(messageSystem.listenerCount(
                EventType.RenderSystem)).to.equal(1);
            messageSystem.removeAllListeners();
            expect(messageSystem.listenerCount(
                EventType.RenderSystem)).to.equal(0);
        });
        it("can remove all listeners of 2, same event type", () => {
            
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            expect(messageSystem.listenerCount(
                EventType.RenderSystem)).to.equal(2);
            messageSystem.removeAllListeners();
            expect(messageSystem.listenerCount(
                EventType.RenderSystem)).to.equal(0);
        });
        it("can remove 1 listener of 1", () => {
            
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            expect(messageSystem.listenerCount(
                EventType.RenderSystem)).to.equal(1);
            messageSystem.removeListener(EventType.RenderSystem, 
                messageDataVariableSave);
            expect(messageSystem.listenerCount(
                EventType.RenderSystem)).to.equal(0);
        });
        it("can remove 1 listener of 2 same event type", () => {
            
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            expect(messageSystem.listenerCount(
                EventType.RenderSystem)).to.equal(2);
            messageSystem.removeListener(EventType.RenderSystem, 
                messageDataVariableSave); 
            expect(messageSystem.listenerCount(
                EventType.RenderSystem)).to.equal(1);
        });
        it("can remove 1 listener of 3, different even type", () => {
            
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.on(EventType.Entity, messageDataVariableSave);
            messageSystem.on(EventType.PhysicsSystem, 
                (messageDataVariableSave));
            expect(messageSystem.allListenersCount()).to.equal(3);
            messageSystem.removeListener(EventType.Entity, 
                messageDataVariableSave);
            expect(messageSystem.allListenersCount()).to.equal(2);
        });
        it("can remove all listeners of one event type of two even types", 
            () => {
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.on(EventType.RenderSystem, messageDataVariableSave);
            messageSystem.on(EventType.PhysicsSystem, messageDataVariableSave);
            expect(messageSystem.allListenersCount()).to.equal(3);
            messageSystem.removeAllListeners(EventType.RenderSystem);
            expect(messageSystem.allListenersCount()).to.equal(1);
        });
    });
});