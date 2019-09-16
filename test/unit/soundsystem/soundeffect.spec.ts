import { SoundEffect } from "../../../src/";

describe("Sound effect unit tests", () => {
    let se = new SoundEffect("../../assets/PowerUp01.wav", false);
    it("should get the asset path", () => {
        expect(se.assetPath).toBeCalled;
        expect(se.assetPath).toBe("../../assets/PowerUp01.wav");
    });
    it("should get the looping value", () => {
        expect(se.loop).toBeCalled;
        expect(se.loop).toBeFalsy;
    });
    it("should set the looping value", () => {
        se.loop = true;
        expect(se.loop).toBeTruthy;
    });
    it("should play when play is called and not paused", () => {
        expect(se.play()).toBeCalled;
    });
    it("should not play when paused", () => {
        se.pause();
        expect(se.play()).toBeCalled;
    });
    it("should stop when stop is called", () => {
        expect(se.stop()).toBeCalled;
    });
    it("should be destroyed when called", () => {
        expect(se.destroy()).toBeCalled;
    });
});