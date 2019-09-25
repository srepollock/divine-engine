import { Entity, CollisionComponentData, CollisionComponent } from "../../../src";
describe("CollisionComponent Integration Test", () => {
	let ccCD = new CollisionComponentData(JSON.parse(JSON.stringify({
        name: "playercollision",
        type: "collision",
        shape: {
            type: "rectangle",
            width: 45,
            height: 50
        }
    })));
    let cc = new CollisionComponent(ccCD);
    let e = new Entity({name: "test"});
    cc.setOwner(e);
    it("should have a name", () => {
        expect(cc.name).not.toBeUndefined;
    });
});