import { expect } from "chai";
import "mocha";
import { Engine, EngineArguments, MessageSystem } from "../../lib/divine.cjs";
process.env.NODE_DEBUG = "true";
describe("Engine unit tests", () => {
    let engArgs: EngineArguments = JSON.parse(JSON.stringify({width: 0, height: 0, debug: false}));
        it("should not throw an exception on getting the instance", () => {
            expect(() => {Engine.instance; }).to.not.throw();
        });
    it("should create a single instance", () => {
        expect(Engine.instance).to.not.be.null;
    });
    it("should begin running right away", () => {
        expect(Engine.instance.started).to.be.true;
    });
        it("should set the source of the engine context (console, browser, electron)", () => {
            expect(Engine.client).to.equal(0); // 0 as it is the index in the Client enum
        });
        it("should have height set to 0", () => {
            expect(Engine.height).to.be.equal(0);
        });
        it("should have width set to 0", () => {
            expect(Engine.width).to.be.equal(0);
        });
    it("should begin running and updating the frame every timestep", () => {
        const frame = Engine.instance.frame;
        setTimeout(() => {}, 1000);
        expect(Engine.instance.frame).to.not.equal(frame);
    });
    it("should pause when pasuse is called", () => {
        Engine.pause();
        expect(Engine.instance.started).to.be.true;
        expect(Engine.instance.running).to.be.false;
        const frame = Engine.instance.frame;
        expect(Engine.instance.frame).to.equal(frame);
        setTimeout(() => {}, 1000);
        expect(Engine.instance.frame).to.equal(frame);
    });
    it("should resume when play is called", () => {
        Engine.play();
        expect(Engine.instance.running).to.be.true;
        const frame = Engine.instance.frame;
        expect(Engine.instance.frame).to.not.equal(frame);
        setTimeout(() => {}, 1000);
        expect(Engine.instance.frame).to.not.equal(frame);
    });
    it("should stop and shtudown when stop is called", () => {
        Engine.stop();
        expect(() => { Engine.instance; }).to.throw;
    });
});