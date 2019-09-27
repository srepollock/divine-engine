import { Entity, PlayerBehaviourData, PlayerBehaviour } from "../../../src";
describe("PlayerBehaviour Integration Test", () => {
	let pbBD = new PlayerBehaviourData();
    pbBD.setFromJson(JSON.parse(JSON.stringify({
        name: "playercontroller",
        type: "player",
        animatedSpriteName: "peasentsprite",
        attackSpriteName: "peasent_attack",
        dieSpriteName: "peasent_die",
        hitSpriteName: "peasent_hit",
        walkSpriteName: "peasent_walk",
        idleSpriteName: "peasent_idle",
        jumpSpriteName: "peasent_jump",
        playerCollisionComponent: "playercollision",
        groundCollisionComponent: "groundcollision",
        enemyCollisionComponent: "enemycollision",
        flagCollisionComponent: "flagcollision"
    })));
    let pb = new PlayerBehaviour(pbBD);
    let e = new Entity({name: "test"});
    pb.setOwner(e);
    it("should have a name", () => {
        expect(pb.name).not.toBeUndefined;
    });
});