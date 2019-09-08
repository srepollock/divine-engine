import { Engine } from "../../../src/core";
process.env.NODE_DEBUG = "true";
describe("Engine Class Unit Tests", () => {
    Engine.start();
    it("should not throw an exception on getting the instance", () => {
        expect(() => {Engine.instance!; }).not.toThrowError();
    });
    it("should create a single instance", () => {
        expect(Engine.instance!).not.toBeNull();
    });
    it("should begin running right away", () => {
        expect(Engine.started).toBe(true);
    });
    it("should set the source of the engine context (console, browser, electron)", () => {
        expect(Engine.client).toBe(0);
    });
    it("should have height set to 0", () => {
        expect(Engine.height).toBe(100);
    });
    it("should have width set to 0", () => {
        expect(Engine.width).toBe(100);
    });
    it("should begin running and updating the frame every timestep, comparing on 'now'", () => {
        const now = Engine.instance!.now;
        setTimeout(() => {}, 1000);
        expect(Engine.instance!.now).not.toBe(now);
    });
    it("should pause when pasuse is called", () => {
        Engine.pause();
        expect(Engine.started).toBe(true);
        expect(Engine.running).toBe(false);
        const now = Engine.instance!.now;
        expect(Engine.instance!.now).toBe(now);
        setTimeout(() => {}, 1000);
        expect(Engine.instance!.now).toBe(now);
    });
    it("should resume when play is called", () => {
        Engine.play();
        expect(Engine.running).toBe(true);
        const now = Engine.instance!.now;
        expect(Engine.instance!.now).not.toBe(now);
        setTimeout(() => {}, 1000);
        expect(Engine.instance!.now).not.toBe(now);
    });
    it("should stop and shtudown when stop is called", () => {
        Engine.stop();
        expect(() => { Engine.instance!; }).toThrow();
    });
});