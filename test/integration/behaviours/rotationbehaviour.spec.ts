import { Entity, RotationBehaviourData, RotationBehaviour } from "../../../src";
describe("RotationBehaviour Integration Test", () => {
	let pbBD = new RotationBehaviourData();
    pbBD.setFromJson(JSON.parse(JSON.stringify({
        name: "rotation",
        rotation: {
            y: 3.14159
        }
    })));
    let pb = new RotationBehaviour(pbBD);
    let e = new Entity({name: "test"});
    pb.setOwner(e);
    it("should have a name", () => {
        expect(pb.name).not.toBeUndefined;
    });
    it("should rotate when update is called", () => {
        pb.update(0.5);
        expect(e.transform.rotation.y).toBe(3.14159);
    });
});