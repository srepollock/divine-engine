import { RenderSystem } from "../../../src/rendersystem";
describe("RenderSystem Unit Tests", () => {
    // TODO: This needs to be moved to functional testing and run in a headless browser instance.
    beforeEach(() => {
        if (RenderSystem.instance !== undefined) {
            RenderSystem.instance.shutdown();
        }
        RenderSystem.initialize({width: 600, height: 800});
    });
    it("should create a new instance on start", () => {
        expect(RenderSystem.instance).not.toBeUndefined();
    });
    it("should be running when initialized", () => {
        expect(RenderSystem.instance.running).toBeTruthy();
    });
    it("should get the canvas of the system", () => {
        expect(RenderSystem.instance.canvas).toBeDefined();
    });
    it("should get the height and width of the system", () => {
        expect(RenderSystem.instance.width).toBe(600);
        expect(RenderSystem.instance.height).toBe(800);
    });
    it("should cleanup when the engine is shutdown", () => {
        RenderSystem.instance.shutdown();
        expect(RenderSystem.instance).toBeUndefined();
    });
    it("should stop when stop is called, and start again when start is called", () => {
        RenderSystem.instance.stop();
        expect(RenderSystem.instance.running).not.toBeTruthy();
        RenderSystem.instance.start();
        expect(RenderSystem.instance.running).toBeTruthy();
    });
});