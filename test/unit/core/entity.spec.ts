import { Entity, Matrix4, Vector3, Behaviour, FlagBehaviour, FlagBehaviourData, SpriteComponent, SpriteComponentData } from "../../../src";

describe("Entity Unit Test", () => {
    let e = new Entity({name: "test"})
    it("should have an id", () => {
        expect(e.id).not.toBeUndefined;
    });
    it("should have a name", () => {
        expect(e.name).not.toBeUndefined;
    });
    it("should be visible", () => {
        expect(e.isVisible).toBeTruthy;
    });
    it("should be alive on start", () => {
        expect(e.isAlive).toBeTruthy;
    });
    it("should not have a parent", () => {
        expect(e.parent).toBeUndefined;
    });
    it("should get the local matrix", () => {
        expect(e.localMatrix).toBeInstanceOf(Matrix4);
    });
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
    it("should remove a component by name", () => {
        e.removeComponent("sprite")
    });
    
    describe("Functions based on parent", () => {
        it("should have a parent when set; by addding a child should remove a child when called", () => {
            let ee = new Entity({name: "test2"});
            ee.addChild(e);
            expect(e.parent).toBe(ee);
            ee.removeChild(e);
        });
        it("should get the world position based on parent", () => {
            expect(e.getWorldPosition()).toBeInstanceOf(Vector3);
        });
    });
    it("should set alive to false", () => {
        e.isAlive = false;
        expect(e.isAlive).toBeFalsy;
    });
    it("should be able to set isVisible to false", () => {
        e.isVisible = false;
        expect(e.isVisible).not.toBeTruthy;
    });
});