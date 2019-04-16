import { expect } from "chai";
import { Engine } from "../../src";
process.env.NODE_DEBUG = "true";
describe("Engine unit tests", () => {
    Engine.start();
    it("should create a single instance", () => {
        expect(Engine.instance).to.not.be.null;
    });
    it("should begin running right away", () => {
        expect(Engine.instance.started).to.be.true;
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