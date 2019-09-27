import { Entity, AnimatedSpriteComponent, AnimatedSpriteComponentData } from "../../../src";
describe("AnimatedSpriteComponent Integration Test", () => {
    let ascCD = new AnimatedSpriteComponentData(JSON.parse(JSON.stringify({
        name: "peasentsprite",
        type: "animatedsprite",
        materialName: "peasent_idle",
        frameHeight: 72,
        frameWidth: 72,
        frameCount: 4,
        frameSequence: [0, 1, 2, 1],
        origin: {
            x: 0.5,
            y: 0.5
        }
    })));
    let asc = new AnimatedSpriteComponent(ascCD);
    let e = new Entity({name: "test"});
    asc.setOwner(e);
    it("should have a name", () => {
        expect(asc.name).not.toBeUndefined;
    });
});