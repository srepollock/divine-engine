import { Entity, GUIButtonBehaviour, GUIButtonBehaviourData } from "../../../src";

describe("GUIButtonBehaviour Integration Test", () => {
    	let gbbBD = new GUIButtonBehaviourData();
        gbbBD.setFromJson(JSON.parse(JSON.stringify({
            name: "howtoplaybutton",
            type: "guibutton",
            zoneName: "howtoplay.sequence"
        })));
        let gbb = new GUIButtonBehaviour(gbbBD);
        let e = new Entity({name: "test"});
        gbb.setOwner(e);
        it("should have a name", () => {
            expect(gbb.name).not.toBeUndefined;
        });
});