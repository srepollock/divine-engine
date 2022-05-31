import { AudioManager } from "../../../src/";

describe("AudioManager Unit Tests", () => {
    AudioManager.initialize();
    it("should not play when no sounds are loaded", () => {
        expect(AudioManager.playSound("test")).toBeCalled;
    });
    it("should not pause when no sounds are loaded", () => {
        expect(AudioManager.pauseSound("test")).toBeCalled;
    });
    it("should not stop when no sounds are loaded", () => {
        expect(AudioManager.stopSound("test")).toBeCalled;
    });
    it("should pause all when called", () => {
        expect(AudioManager.pauseAll()).toBeCalled;
    });
    it("should stop all when called", () => {
        expect(AudioManager.stopAll()).toBeCalled;
    });
    AudioManager.loadSoundFile("test", "../../assets/PowerUp01.wav", false);
    it("should play when called and sound is loaded", () => {
        expect(AudioManager.playSound("test")).toBeCalled;
    });
    it("should pause when called and sound is loaded", () => {
        expect(AudioManager.pauseSound("test")).toBeCalled;
    });
    it("should stop when called and sound is loaded", () => {
        expect(AudioManager.stopSound("test")).toBeCalled;
    });
    it("should pause all when called and sound is loaded", () => {
        expect(AudioManager.pauseAll()).toBeCalled;
    });
    it("should stop all when called and sound is loaded", () => {
        expect(AudioManager.stopAll()).toBeCalled;
    });
});
