import { expect } from "chai";
import "mocha";
import { DObject, Engine, EngineArguments, Log, Message } from "../../src";

describe("DObject unit testing", () => {
    var obj: DObject;
    describe("empty object instantiation", () => {
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
    describe("", () => {
        beforeEach(() => {
            obj = new DObject("player");
        });
        it("should have an id of \"player \"", () => {
            expect(obj.tag).to.equal("player");
        });
    });
    describe("message receiving", () => {
        before(() => {
            Engine.start(new EngineArguments());
        });
        it("should be able to send messages", () => {
            var dm: Message;
            Engine.instance.messageSystem.on("test", (message: Message) => {
                dm = message;
                Log(message.JSONString);
            });
            obj.sendMessage("test", "Test Message Error");
            expect(dm).to.not.be.null;
        });
        it("should be able to receive messages", () => {
            Engine.scene.addEntity(obj);
            var dm: Message;
            Engine.instance.messageSystem.on("test", (message: Message) => {
                dm = message;
                Log(message.JSONString);
            });
            expect(dm).to.not.be.null;
        });
    });
});