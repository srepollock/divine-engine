import { EnemyBehaviour, EnemyBehaviourData, Entity } from "../../../src";

describe("EnemyBehaviour Integration Test", () => {
    let ebBD = new EnemyBehaviourData();
    ebBD.setFromJson(JSON.parse(JSON.stringify({
        name: "enemycontroller",
        type: "enemy",
        animatedSpriteName: "wolfsprite",
        attackSpriteName: "wolf_attack",
        dieSpriteName: "wolf_die",
        hitSpriteName: "wolf_hit",
        walkSpriteName: "wolf_walk",
        idleSpriteName: "wolf_walk",
        jumpSpriteName: "wolf_walk",
        start: {
            x: 0,
            y: 0
        },
        end: {
            x: 1,
            y: 1
        },
        direction: {
            x: 1,
            y: 0
        },
        enemyCollisionComponent: "enemycollision",
        playerCollisionComponent: "playercollision",
        groundCollisionComponent: "groundcollision"
    })));
    let eb = new EnemyBehaviour(ebBD);
    let e = new Entity({name: "test"});
    eb.setOwner(e);
    it("should update the enemy behaviour", () => {
        eb.update(0.5);
        expect(e.transform.position.x).toBe(0.5);
    });
});