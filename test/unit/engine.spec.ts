import { expect } from "chai";
import { Engine } from "../../src";

describe("Engine unit tests", () => {
    Engine.start();
    it("should create a single instance", () => {
        expect(Engine.instance).to.not.be.null;
    });
    it("should begin running right away", () => {
        expect(Engine.instance.started).to.be.true;
    });
    it("should begin running and updating the delta every timestep", () => {
        let delta = Engine.instance.delta;
        setTimeout(() => {}, 100);
        expect(Engine.instance.delta).to.not.equal(delta);
    });
    it("should pause when pasuse is called", () => {
        Engine.pause();
        expect(Engine.instance.started).to.be.true;
        expect(Engine.instance.running).to.be.false;
        let delta = Engine.instance.delta;
        expect(Engine.instance.delta).to.equal(delta);
        setTimeout(() => {}, 100);
        expect(Engine.instance.delta).to.equal(delta);
    });
    it("should resume when play is called", () => {
        Engine.play();
        expect(Engine.instance.running).to.be.true;
        let delta = Engine.instance.delta;
        expect(Engine.instance.delta).to.not.equal(delta);
        setTimeout(() => {}, 100);
        expect(Engine.instance.delta).to.not.equal(delta);
    });
    it("should stop and shtudown when stop is called", () => {
        Engine.stop();
        expect(Engine.instance).to.be.undefined;
    });
});