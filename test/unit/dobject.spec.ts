import { expect } from "chai";
import "mocha";
// tslint:disable-next-line:max-line-length
import { DObject } from "../../src/core/dobject";

describe("DObject unit testing", () => {
    describe("empty object instantiation", () => {
        var obj: DObject;
        beforeEach(() => {
            obj = new DObject();
        });
        it("should have an id", () => {
            expect(obj.id).to.not.equal("");
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
    // describe("dobject's receiving messages", () => {
    //     var ent: Entity;
    //     before(() => {
    //         Engine.start(new EngineArguments());
    //     });
    //     beforeEach(() => {
    //         ent = new Entity({tag: "player", transform: new Transform()});
    //         MessageSystem.addListener(EventType.Entity, ent);
    //     });
    //     after(() => {
    //         Engine.shutdown();
    //     });
    //     afterEach(() => {
    //         MessageSystem.removeListener("player", ent);
    //     });
    //     it("should be able to send messages", () => {
    //         var dm: Message;
    //         MessageSystem.addListener("Test", ent);
    //         MessageSystem.sendMessage("test", new TestMessage("Test Message Error"));
    //         expect(dm).to.not.be.null;
    //     });
    //     it("should be able to receive messages", () => {
    //         Engine.instance.scene.addEntity(ent);
    //     });
    // });
});