import { Entity, ScoringComponentData, ScoringComponent, MessageBus, Message, MessageType, ScoringComponentBuilder } from "../../../src";
describe("ScoringComponent Integration Test", () => {
	let scCD = new ScoringComponentData(JSON.parse(JSON.stringify({
        name: "playercollision",
        type: "collision",
        shape: {
            type: "rectangle",
            width: 45,
            height: 50
        }
    })));
    let sc = new ScoringComponent(scCD);
    let e = new Entity({name: "test"});
    sc.setOwner(e);
    it("should have a name", () => {
        expect(sc.name).not.toBeUndefined;
    });
    it("should update the score at the end of the level", () => {
        sc.update(1);
        Message.send(MessageType.ZONE_FINISHED, undefined);
        MessageBus.update(1);
        expect(ScoringComponent.SCORE).toBe(5200);
    });
    it("should update the final score at the end of the game", () => {
        sc.update(1);
        Message.send(MessageType.GAME_OVER, undefined);
        MessageBus.update(1);
        expect(ScoringComponent.HIGHSCORE).toBe(10300);
    });
});