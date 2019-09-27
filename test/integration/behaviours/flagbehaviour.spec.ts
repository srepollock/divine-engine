import { FlagBehaviour, FlagBehaviourData, Entity } from "../../../src";

describe("FlagBehaviour Integration Test", () => {
    let fbBD = new FlagBehaviourData();
    fbBD.setFromJson(JSON.parse(JSON.stringify({
        name: "flagbehaviour",
        type: "flag",
        zoneName: "zone1_2",
        playerCollisionComponent: "playercollision",
        flagCollisionComponent: "flagcollision"
    })));
    let fb = new FlagBehaviour(fbBD);
    let e = new Entity({name: "test"});
    fb.setOwner(e);
    it("should have a name", () => {
        expect(fb.name).not.toBeUndefined;
    });
    it("should update when called", () => {
        fb.update(1);
        // TODO: check here.
    });
});