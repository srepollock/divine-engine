import { expect } from "chai";
import "mocha";
import { DObject, Engine, EngineArguments, Entity, EventType, Log, Message, Transform } from "../../src";

describe("DObject unit testing", () => {
    describe("empty object instantiation", () => {
        var obj: DObject;
        beforeEach(() => {
            obj = new DObject();
        });
        it("should have an guid", () => {
            expect(obj.guid).to.not.equal("");
        });
        it("should have no tag", () => {
            expect(obj.tag).to.equal("");
        });
    });
    describe("filled out object instantiation", () => {
        var obj: DObject;
        beforeEach(() => {
            obj = new DObject("player");
        });
        it("should have an id of \"player \"", () => {
            expect(obj.tag).to.equal("player");
        });
    });
    describe("dobject's receiving messages", () => {
        var ent: Entity;
        before(() => {
            Engine.start(new EngineArguments());
        });
        beforeEach(() => {
            ent = new Entity("player", new Transform());
            ent.addSubscription(EventType.Entity);
        });
        it("should be able to send messages", () => {
            var dm: Message;
            Engine.instance.messageSystem.on("test", (message: Message) => {
                dm = message;
                Log(message.JSONString);
            });
            ent.sendMessage("test", "Test Message Error");
            expect(dm).to.not.be.null;
        });
        it("should be able to receive messages", () => {
            Engine.instance.scene.addEntity(ent);
            var dm: Message;
            Engine.instance.messageSystem.on("test", (message: Message) => {
                dm = message;
                Log(message.JSONString);
            });
            expect(dm).to.not.be.null;
        });
    });
});