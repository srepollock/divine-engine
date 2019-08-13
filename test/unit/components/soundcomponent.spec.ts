import { guid, ISound, log, LogLevel, Sound, SoundAction, SoundComponent } from "../../../src";

describe("Sound Component Unit Test", () => {
    let sc: SoundComponent;
    beforeEach(() => {
        sc = new SoundComponent(
            new Sound("path/to/sound.mp4", SoundAction.trigger, () => {
                log(LogLevel.info, `Sound has been played`);
            }),
            new Sound("path/to/sound2.mp4", SoundAction.trigger, () => {
                log(LogLevel.info, `Sound has been played`);
            })
        );
    });
    it("should have 2 sounds by default", () => {
        expect(sc.sounds.length).toBe(2);
    });
});