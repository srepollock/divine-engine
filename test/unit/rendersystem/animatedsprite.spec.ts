import { AnimatedSprite } from "../../../src";
describe("AnimatedSprite Unit Tests", () => {
    let as = new AnimatedSprite("test", "../../assets/peasent.png", 72, 72, 72, 72, 1, [1]);
    it("should have a material name", () => {
        expect(as.materialName).toBe("../../assets/peasent.png");
    });
    it("should have a frame count", () => {
        expect(as.frameCount).toBe(1);
    });
    it("should be playing", () => {
        as.play();
        expect(as.isPlaying).toBeTruthy;
    });
    it("should stop playing when stopped", () => {
        as.stop();
        expect(as.isPlaying).toBeFalsy;
    });
    it("should have a current frame set to 0 without update called", () => {
        expect(as.currentFrame).toBe(0);
    });
    it("should set the frame number", () => {
        // TODO: this needs WebGL
        // as.setFrame(1)
        // expect(as.currentFrame).toBe(1);
    });
    it("should update when called", () => {
        // TODO: this needs WebGL
        // as.update(1);
        // expect(as.currentFrame).toBe(2);
    });
    it("should set the frame number", () => {
        // TODO: this needs WebGL
        // as.setFrameOnce(0)
        // expect(as.currentFrame).toBe(0);
        // expect(as.isPlaying).toBeFalsy;
    });
    it("should be destroyed when called", () => {
        // as.destroy();
        // expect(as).toBeUndefined;
    });
});