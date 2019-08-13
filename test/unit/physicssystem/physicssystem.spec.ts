import { Component, PhysicsBodyComponent } from "../../../src/components";
import { Entity, PhysicsStream } from "../../../src/core";
import { guid } from "../../../src/helper";
import { Vector3 } from "../../../src/math";
import { PhysicsSystem } from "../../../src/physicssystem";

describe("SoundSystem Unit Tests", () => {
    beforeAll(() => {
        PhysicsSystem.initialize();
    });
    it("should create the physics system and get no current physics bodies as it's empty", () => {
        expect(PhysicsSystem.physicsBodies.size).toBe(0);
    });
    it("should update the PhysicsBodies every update of the physics system then remove the physics body", () => {
        let id = guid();
        let e = new Entity({components: new Array<Component>(
            new PhysicsBodyComponent(new Map<string, Vector3>().set(id, new Vector3(1, 0, 0)))
        )});
        PhysicsSystem.addPhysicsBody(e.id, e.getComponent("physicsbody.component")!);
        let pb1: Map<string, PhysicsBodyComponent> = PhysicsSystem.physicsBodies;
        setTimeout(() => {
            expect(pb1).not.toStrictEqual(PhysicsSystem.physicsBodies);
        }, 5000);
        (e.getComponent("physicsbody.component") as PhysicsBodyComponent).removeForceByGuid(id);
        expect((e.getComponent("physicsbody.component") as PhysicsBodyComponent).removeForceByGuid(id)).toBe(false);
    });
});