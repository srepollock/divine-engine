import { Entity, SequenceBehaviourData, SequenceBehaviour } from "../../../src";
describe("SequenceBehaviour Integration Test", () => {
	let sbBD = new SequenceBehaviourData();
    sbBD.setFromJson(JSON.parse(JSON.stringify({
        name: "wizard_sequence",
        type: "sequence",
        animatedSpriteName: "wizardsprite",
        attackSpriteName: "wizard_attack",
        dieSpriteName: "wizard_die",
        hitSpriteName: "wizard_hit",
        walkSpriteName: "wizard_run",
        idleSpriteName: "wizard_idle",
        jumpSpriteName: "wizard_idle",
        actions: [
            {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 1,
                    y: 0
                },
                time: 1
            }
        ]
    })));
    let sb = new SequenceBehaviour(sbBD);
    let e = new Entity({name: "test"});
    sb.setOwner(e);
    it("should have a name", () => {
        expect(sb.name).not.toBeUndefined;
    });
    it("should move when update is called", () => {
        sb.update(0.5);
        expect(e.transform.position.x).toBe(0.5);
    });
});