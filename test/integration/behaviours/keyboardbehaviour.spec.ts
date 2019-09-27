import { Entity, KeyboardMovementBehaviour, KeyboardMovementBehaviourData } from "../../../src";

describe("KeyboardBehaviour Integration Test", () => {
    let kbBD = new KeyboardMovementBehaviourData();
    kbBD.setFromJson(JSON.parse(JSON.stringify({
        
    })));
    let kb = new KeyboardMovementBehaviour(kbBD);
    let e = new Entity({name: "test"});
    kb.setOwner(e);
    it("should have a name", () => {
        expect(kb.name).not.toBeUndefined;
    });
});