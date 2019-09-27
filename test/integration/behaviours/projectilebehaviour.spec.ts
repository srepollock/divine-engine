import { Entity, ProjectileBehaviourData, ProjectileBehaviour } from "../../../src";
describe("ProjectileBehaviour Integration Test", () => {
	let pbBD = new ProjectileBehaviourData();
    pbBD.setFromJson(JSON.parse(JSON.stringify({
        name: "test",
        acceleration: {
            x: 0,
            y: 0
        },
        playerCollisionComponent: "playercollision",
        projectileCollisionComponent: "projectilecollision",
        animatedSpriteName: "projectile",
        projectileSprite: "projectilesprite",
        hitSpriteName: "projectile_hit",
        maxVelocityX: 1,
        maxVelocityY: 1,
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 1,
            y: 0
        },
        direction: {
            x: 1,
            y: 0
        }
    })));
    let pb = new ProjectileBehaviour(pbBD);
    let e = new Entity({name: "test"});
    pb.setOwner(e);
    it("should have a name", () => {
        expect(pb.name).not.toBeUndefined;
    });
    it("should udpate when update is called", () => {
        pb.update(0.5);
        expect(e.transform.position.x).toBe(0.5);
    });
});