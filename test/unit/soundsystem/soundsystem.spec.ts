import { SoundSystem } from "../../../src";
describe("SoundSystem Unit Tests", () => {
    beforeEach(() => {
        SoundSystem.initialize();
    });
    it("should initialize and have no messages in the stream", () => {
        expect(SoundSystem.instance.messageQueue.length).toBe(0);
    });
});