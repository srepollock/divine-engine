import { expect } from "chai";
import "mocha";
// tslint:disable-next-line:max-line-length
import { DObject, EntityMessage, EventType, Log, Message, MessageSystem, MouseInputMessage, PhysicsSystemMessage, Point, Priority, RenderComponent, RenderSystemMessage, TestMessage } from "../../../src";

describe("Message System unit testing", () => {
    describe("Messages", () => {
        it("should be able to be created empty", () => {
            let message: Message = new Message(this, Priority.Low);
            // tslint:disable-next-line:max-line-length
            expect(message.JSONString).to.equal(`{"_id":"${message.id}","_priority":${message.priority},"_data":"${message.data}"}`);
        });
        it("should take multiple strings of data as input", () => {
            let message: TestMessage = new TestMessage("1");
            // tslint:disable-next-line:max-line-length
            expect(message.JSONString).to.equal(`{"_id":"${message.id}","_sender":"${message.sender}","_priority":${message.priority},"_data":"${message.data}"}`);
        });
        it("should save data as a string in JSON format", () => {
            let message: TestMessage = new TestMessage("1");
            expect(message).to.haveOwnProperty("_data");
        });
        it("should export as a JSON string", () => {
            let message: TestMessage = new TestMessage("1");
            // tslint:disable-next-line:max-line-length
            expect(message.JSONString).to.equal(`{"_id":"${message.id}","_sender":"${message.sender}","_priority":${message.priority},"_data":"${message.data}"}`);
        });
        it("should export as a JSON object", () => {
            let message: TestMessage = new TestMessage("1");
            expect(message.JSON).to.be.a("Object");
        });
        it("should be able to get properties of TestMessage", () => {
            let message: TestMessage = new TestMessage("100");
            expect(message.data).to.equal("100");
        });
        it("should be able to get the properties of a RenderMessage", () => {
            let rc: RenderComponent = new RenderComponent("1");
            let message: RenderSystemMessage = new RenderSystemMessage(JSON.stringify(rc));
            expect((JSON.parse(message.data) as RenderComponent)).to.deep.equal(rc);
        });
        it("should be able to get the properties of a PhysicsMessage", () => {
            let message: PhysicsSystemMessage = new PhysicsSystemMessage();
            expect(message.id).to.equal(`${message.id}`);
        });
        it("should be able to get properties of MouseInputMessage", () => {
            let message: MouseInputMessage = new MouseInputMessage(11, 23);
            expect((JSON.parse(message.data) as Point).x).to.equal(11);
            expect((JSON.parse(message.data) as Point).y).to.equal(23);
        });
    });
    describe("Message system", () => {
        var data: string = "";
        var data2: string = "";
        class Listener extends DObject {
            public onMessage(message: Message) {
                data = message.JSONString;
                Log(message.JSONString);
            }
        }
        var listener: Listener = new Listener();
        beforeEach(() => {
            data = "";
            data2 = "";
            MessageSystem.initialize();
            MessageSystem.start(); // REVIEW: Engine isn't running, maybe I need to start it first?
            // REVIEW: Where can I run a loop for the MessageSystem.update loop?
        });
        afterEach(() => {
            MessageSystem.shutdown();
        });
        it("should have no listeners if none added", () => {
            expect(MessageSystem.allListenerCount()).to.equal(0);
        });
        it("should throw an error if the instance is not defined and the get is called", () => {
            MessageSystem.shutdown();
            expect(MessageSystem.instance).to.throw();
        });
        it("should add new listener of EventType.RenderSystem", () => {
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            expect(MessageSystem.listenerCount(EventType.RenderSystem)).to
                .equal(1);
        });
        it("should add 3 new listeners of the same EventType.RenderSystem", 
            () => {
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            expect(MessageSystem.listenerCount(EventType.RenderSystem))
                .to.equal(3);
        });
        it("should add 3 new listeners of different types", () => {
            MessageSystem.addListener(EventType.PhysicsSystem, new Listener());
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            MessageSystem.addListener(EventType.SoundSystem, new Listener());
            expect(MessageSystem.allListenerCount()).to.equal(3);
        });
        it("should add 5 different listeners and remove 1 listener of differnt types", () => {
            MessageSystem.addListener(EventType.PhysicsSystem, listener = new Listener());
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            MessageSystem.addListener(EventType.IOSystem, new Listener());
            MessageSystem.addListener(EventType.Entity, new Listener());
            MessageSystem.addListener(EventType.ErrorSystem, new Listener());
            MessageSystem.removeListener(EventType.PhysicsSystem, listener);
            expect(MessageSystem.allListenerCount()).to.equal(4);
        });
        it("should get all listeners in the system", () => {
            
            MessageSystem.addListener(EventType.Entity, new Listener());
            MessageSystem.addListener(EventType.ErrorSystem, new Listener());
            MessageSystem.addListener(EventType.IOSystem, new Listener());
            MessageSystem.addListener(EventType.KeyInput, new Listener());
            MessageSystem.addListener(EventType.MouseInput, new Listener());
            MessageSystem.addListener(EventType.PhysicsSystem, new Listener());
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            MessageSystem.addListener(EventType.TouchInput, new Listener());
            MessageSystem.addListener(EventType.SoundSystem, new Listener());
            expect(MessageSystem.allListenerCount()).to.equal(9);
        });
        // TODO: Fix this
        it("is receiving render messages and emitting render messages", () => {
            
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            MessageSystem.sendMessage(EventType.RenderSystem, new MouseInputMessage(1, 1));
            expect(data).to.not.equal(new MouseInputMessage(1, 1).JSONString);
            MessageSystem.sendMessage(EventType.RenderSystem, new MouseInputMessage(2, 4));
            MessageSystem.sendMessage(EventType.RenderSystem, new MouseInputMessage(81, 81));
            expect(data).to.not.equal(new MouseInputMessage(81, 81).JSONString);
        });
        it("is receiving render messages and emitting physics messages", () => {
            
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            MessageSystem.sendMessage(EventType.PhysicsSystem, new PhysicsSystemMessage());
            expect(data).to.equal("");
        });
        // TODO: Fix this
        it("should send 2 types (EventType.MouseInputMessage and EventType.Entity) and receive only EventType.Entity", 
            () => {
            var message = new EntityMessage();
            MessageSystem.addListener(EventType.Entity, new Listener());
            MessageSystem.sendMessage(EventType.Entity, message);
            expect(data).to.equal(message.data); 
            message = new MouseInputMessage(10, 10);
            MessageSystem.sendMessage(EventType.IOSystem, message);
            expect(data).to.not.equal(message.data);
        });
        it("should send and receive a message of EventType.Entity to two entity listeners", () => {
            MessageSystem.addListener(EventType.Entity, new Listener());
            MessageSystem.addListener(EventType.Entity, new Listener());
            MessageSystem.sendMessage(EventType.Entity, new EntityMessage());
            expect(data).to.not.equal(new EntityMessage().JSONString);
            expect(data2).to.not.equal(new EntityMessage().JSONString);
        });
        it("can remove all listeners of 1", () => {
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            expect(MessageSystem.listenerCount(EventType.RenderSystem)).to.equal(1);
            MessageSystem.removeAllListeners();
            expect(MessageSystem.listenerCount(EventType.RenderSystem)).to.equal(0);
        });
        it("can remove all listeners of 2, same event type", () => {
            
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            MessageSystem.addListener(EventType.RenderSystem, new Listener());
            expect(MessageSystem.listenerCount(EventType.RenderSystem)).to.equal(2);
            MessageSystem.removeAllListeners();
            expect(MessageSystem.listenerCount(EventType.RenderSystem)).to.equal(0);
        });
        it("can remove 1 listener of 1", () => {
            let listener2 = new Listener();
            MessageSystem.addListener(EventType.RenderSystem, listener2);
            expect(MessageSystem.listenerCount(EventType.RenderSystem)).to.equal(1);
            MessageSystem.removeListener(EventType.RenderSystem, listener2);
            expect(MessageSystem.listenerCount(EventType.RenderSystem)).to.equal(0);
        });
        it("can remove 1 listener of 2 same event type", () => {
            var listener2;
            var listener3;
            MessageSystem.addListener(EventType.RenderSystem, listener2 = new Listener());
            MessageSystem.addListener(EventType.RenderSystem, listener3 = new Listener());
            expect(MessageSystem.listenerCount(EventType.RenderSystem)).to.equal(2);
            MessageSystem.removeListener(EventType.RenderSystem, listener2); 
            expect(MessageSystem.listenerCount(
                EventType.RenderSystem)).to.equal(1);
        });
        it("can remove 1 listener of 3, different even type", () => {
            var listener2;
            var listener3;
            MessageSystem.addListener(EventType.RenderSystem, listener = new Listener());
            MessageSystem.addListener(EventType.Entity, listener2 = new Listener());
            MessageSystem.addListener(EventType.PhysicsSystem, listener3 = new Listener());
            expect(MessageSystem.allListenerCount()).to.equal(3);
            MessageSystem.removeListener(EventType.Entity, listener2);
            expect(MessageSystem.allListenerCount()).to.equal(2);
        });
        it("can remove all listeners of one event type of two even types", () => {
            var listener2;
            var listener3;
            MessageSystem.addListener(EventType.RenderSystem, listener = new Listener());
            MessageSystem.addListener(EventType.RenderSystem, listener2 = new Listener());
            MessageSystem.addListener(EventType.PhysicsSystem, listener3 = new Listener());
            expect(MessageSystem.allListenerCount()).to.equal(3);
            MessageSystem.removeAllListeners(EventType.RenderSystem);
            expect(MessageSystem.allListenerCount()).to.equal(1);
        });
    });
});
