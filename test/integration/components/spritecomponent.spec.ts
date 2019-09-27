import { Entity, SpriteComponentData, SpriteComponent } from "../../../src";
describe("SpriteComponent Integration Test", () => {
    let scCD: SpriteComponentData = new SpriteComponentData(JSON.parse(JSON.stringify({
        name: "titlescreen",
        type: "sprite",
        materialName: "titlescreen",
        origin: {
            x: 0,
            y: 0
        }
    })));
    let sc = new SpriteComponent(scCD);
    let e = new Entity({name: "test"});
    sc.setOwner(e);
    it("should have a name", () => {
        expect(sc.name).not.toBeUndefined;
    });
});