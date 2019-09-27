import { CollisionManager, CollisionComponent, CollisionComponentData, Entity } from "../../../src";
import { executionAsyncId } from "async_hooks";

describe("CollisionManager Unit Test", () => {
    let cd1 = new CollisionComponent(new CollisionComponentData(JSON.parse(JSON.stringify({
        name: "collision a",
        shape: {
            type: "rectangle",
            x: 10,
            y: 10
        }
    }))));
    let cd2 = new CollisionComponent(new CollisionComponentData(JSON.parse(JSON.stringify({
        name: "collision a",
        shape: {
            type: "rectangle",
            x: 10,
            y: 10
        }
    }))));
    let e = new Entity({name: "test"});
    e.addComponent(cd1);
    e.load();
    let ee = new Entity({name: "test"});
    ee.addComponent(cd2);
    ee.load();
    CollisionManager.initialize();
    it("should update when called", () => {
        CollisionManager.update(1);
        e.transform.position.x = 15;
        CollisionManager.update(1);
    });
});