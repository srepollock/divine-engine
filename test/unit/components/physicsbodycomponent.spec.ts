import { guid, PhysicsBodyComponent, Vector3 } from "../../../src";

describe("PhysicsBody Component Unit Tests", () => {
    let pbc: PhysicsBodyComponent;
    beforeEach(() => {
        pbc = new PhysicsBodyComponent(new Map<string, Vector3>().set(guid(), new Vector3(1, 0, 0)));
    });
    it("should get all the forces in the array", () => {
        expect(pbc.forces.size).toBe(1);
    });
    it("should remove the force based on the ID applying it", () => {
        let forces = pbc.forces;
        expect(pbc.removeForceByGuid(forces.keys().next().value)).toBe(true);
    });
    it("should not remove the force if no ID was given", () => {
        expect(pbc.removeForceByGuid()).toBe(false);
    });
});