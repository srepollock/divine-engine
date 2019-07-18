import { Engine, EngineArguments } from "../../../src";
process.env.NODE_DEBUG = "true";
describe("Engine Class Unit Tests", () => {
    let engArgs: EngineArguments = JSON.parse(JSON.stringify({width: 0, height: 0, debug: false}));
        it("should not throw an exception on getting the instance", () => {
            expect(() => {Engine.instance; }).not.toThrowError();
        });
    it("should create a single instance", () => {
        expect(Engine.instance).not.toBeNull();
    });
    it("should begin running right away", () => {
        expect(Engine.started).toBe(true);
    });
        it("should set the source of the engine context (console, browser, electron)", () => {
            expect(Engine.client).toBe(0); // 0 as it is the index in the Client enum
        });
        it("should have height set to 0", () => {
            expect(Engine.height).toBe(0);
        });
        it("should have width set to 0", () => {
            expect(Engine.width).toBe(0);
        });
    it("should begin running and updating the frame every timestep", () => {
        const frame = Engine.instance.frame;
        setTimeout(() => {}, 1000);
        expect(Engine.instance.frame).not.toBe(frame);
    });
    it("should pause when pasuse is called", () => {
        Engine.pause();
        expect(Engine.instance.started).toBe(true);
        expect(Engine.instance.running).toBe(false);
        const frame = Engine.instance.frame;
        expect(Engine.instance.frame).toBe(frame);
        setTimeout(() => {}, 1000);
        expect(Engine.instance.frame).toBe(frame);
    });
    it("should resume when play is called", () => {
        Engine.play();
        expect(Engine.instance.running).toBe(true);
        const frame = Engine.instance.frame;
        expect(Engine.instance.frame).not.toBe(frame);
        setTimeout(() => {}, 1000);
        expect(Engine.instance.frame).not.toBe(frame);
    });
    it("should stop and shtudown when stop is called", () => {
        Engine.stop();
        expect(() => { Engine.instance; }).toThrow();
    });
});