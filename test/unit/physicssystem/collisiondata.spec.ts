import { CollisionData, CollisionComponent, CollisionComponentData } from "../../../src";

describe("CollisionData Unit Test", () => {
    let cd1 = new CollisionComponent(new CollisionComponentData(JSON.parse(JSON.stringify({
        name: "collision a",
        shape: {
            type: "rectangle",
            x: 10,
            y: 10
        }
    }))));
    let cd2 = new CollisionComponent(new CollisionComponentData(JSON.parse(JSON.stringify({
        name: "collision b",
        shape: {
            type: "rectangle",
            x: 10,
            y: 10
        }
    }))));
    let cd = new CollisionData(1, cd1, cd2);
    it("should have a name", () => {
        expect(cd.time).not.toBeUndefined;
    });
    it("should have a collision 1 named collision a", () => {
        expect(cd.a.name).toBe("collision a");
    });
    it("should have a collision 1 named collision b", () => {
        expect(cd.b.name).toBe("collision b");
    });
});