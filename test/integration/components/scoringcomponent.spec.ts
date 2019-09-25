import { Entity, ScoringComponentData, ScoringComponent } from "../../../src";
describe("ScoringComponent Integration Test", () => {
	let scCD = new ScoringComponentData(JSON.parse(JSON.stringify({
        name: "playercollision",
        type: "collision",
        shape: {
            type: "rectangle",
            width: 45,
            height: 50
        }
    })));
    let sc = new ScoringComponent(scCD);
    let e = new Entity({name: "test"});
    sc.setOwner(e);
    it("should have a name", () => {
        expect(sc.name).not.toBeUndefined;
    });
});