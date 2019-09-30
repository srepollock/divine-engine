import { Entity, Matrix4, Vector3, Behaviour, FlagBehaviour, FlagBehaviourData, SpriteComponent, SpriteComponentData, CollisionComponent, CollisionComponentData, PlayerBehaviour, PlayerBehaviourData } from "../../../src";

describe("Entity Unit Test", () => {
    let e = new Entity({name: "test"});
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
    e.addBehaviour(pb);
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
    e.addComponent(cc);
    let ee = new Entity({name: "test2"});
    e.addChild(ee);
    it("should add a behaviour and should get a behaviour by name", () => {
        let bd = new FlagBehaviourData();
        bd.setFromJson(JSON.parse(JSON.stringify({
            name: "flag",
            zonename: "",
            flagcollision: "",
            playercollision: ""
        })));
        let b = new FlagBehaviour(bd);

        e.addBehaviour(b);
        e.getBehaviourByName(b.name)
        expect(e.getBehaviourByName(b.name)).not.toBeUndefined;
        expect(e.getBehaviourByName(b.name)!.name).toBe(b.name);
    });
    it("should add a component and should get a component by name", () => {
        let cd = new SpriteComponentData(JSON.parse(JSON.stringify({
            name: "sprite",
            materialName: "",
            origin: {
                x: 0,
                y: 0
            },
            width: 10,
            height: 10
        })));
        let c = new SpriteComponent(cd);

        e.addComponent(c);
        e.getComponentByName(c.name)
        expect(e.getBehaviourByName(c.name)).not.toBeUndefined;
        expect(e.getComponentByName(c.name)!.name).toBe(c.name);
    });
    it("should unsubscribe from all messages", () => {
        e.unsubscribeAll();
        expect(e.unsubscribeAll()).toBeCalled;
    });
    it("should update all components when updates are ready", () => {
        e.updateReady();
        e.update(1);
        expect(e.update).toBeCalled;
    });
    it("should not remove a component that doesn't exist", () => {
        e.removeComponent("missing");
        expect(e.removeComponent).toBeCalled;
    });
    it("should remove a component that does exist", () => {
        e.removeComponent("sprite");
        expect(e.removeComponent).toBeCalled;
    });
    it("should die when isAlive is false and destroy behaviours, components and children", () => {
        e.isAlive = false;
        e.update(0);
        expect(e.update).toBeFalsy;
    });
});