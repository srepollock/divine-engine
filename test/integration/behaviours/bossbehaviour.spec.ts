import { BossBehaviour, BossBehaviourData, Entity } from "../../../src";

describe("BossBehaviour Integration Test", () => {
    let bbBD = new BossBehaviourData();
    bbBD.setFromJson(JSON.parse(JSON.stringify({
        name: "enemycontroller",
        type: "boss",
        animatedSpriteName: "wizardsprite",
        attackSpriteName: "wizard_run",
        dieSpriteName: "wizard_die2",
        hitSpriteName: "wizard_hit",
        walkSpriteName: "wizard_run",
        idleSpriteName: "wizard_idle",
        jumpSpriteName: "wizard_run",
        projectileSpriteComponent: "projectilesprite",
        playerCollisionComponent: "playercollision",
        enemyCollisionComponent: "enemycollision",
        groundCollisionComponent: "groundcollision",
        maxVelocityX: 8,
        maxVelocityY: 8,
        actionLoops: [
            [
                {
                    type: "movement",
                    duration: 2,
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 1,
                        y: 1
                    }
                }
            ]
        ]
    })));
    let bb = new BossBehaviour(bbBD);
    let e = new Entity({name: "test"});
    bb.setOwner(e);
    it("should update the boss behaviour", () => {
        bb.update(1);
        expect(e.transform.position.x).toBe(0.5);
    });
    it("should get the current action index", () => {
        expect(bb.actionIndex).toBe(0);
    });
    it("should set the current action index", () => {
        bb.actionIndex = 0;
        expect(bb.actionIndex).toBe(0);
    });
    it("should get the current loop index", () => {
        expect(bb.actionLoops).not.toBeUndefined;
    });
    it("should get the current loop", () => {
        expect(bb.currentLoop).not.toBeUndefined();
    });
    it("should get the current action", () => {
        expect(bb.currentAction()).not.toBeUndefined;
    });
});