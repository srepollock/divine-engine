import { Entity, SoundBehaviourData, SoundBehaviour } from "../../../src";
describe("SoundBehaviour Integration Test", () => {
	let sbBD = new SoundBehaviourData();
    sbBD.setFromJson(JSON.parse(JSON.stringify({
        name: "titlescreensound",
        type: "sound",
        soundName: "maintheme"
    })));
    let sb = new SoundBehaviour(sbBD);
    let e = new Entity({name: "test"});
    sb.setOwner(e);
    it("should have a name", () => {
        expect(sb.name).not.toBeUndefined;
    });
});