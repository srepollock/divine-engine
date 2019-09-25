import { AIMovementBehaviour, AIMovementBehaviourData, Entity } from "../../../src";

describe("AIMovementBehaviour Integration Test", () => {
    let aiBD = new AIMovementBehaviourData();
    aiBD.setFromJson(JSON.parse(JSON.stringify({
        name: "test"
    })));
    let ai = new AIMovementBehaviour(aiBD);
    let e = new Entity({name: "test"});
    ai.setOwner(e);
    it("should update and move a slice based on the delta given", () => {
        ai.update(0.5)
        expect(e.transform.position.x).toBe(0.5);
    });
});