import { SoundAction } from "../../../src/soundsystem";

describe("Sound Action Unit Tests", () => {
    it("should have 3 types of sound actions", () => {
        expect(SoundAction.delay).toBeTruthy();
        expect(SoundAction.loop).toBeTruthy();
        expect(SoundAction.trigger).toBeTruthy();
    });
});