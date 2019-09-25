import { GUIBehaviour, Entity, GUIBehaviourData } from "../../../src";

describe("GUIBehaviour Integration Test", () => {
    let gbBD = new GUIBehaviourData();
    gbBD.setFromJson(JSON.parse(JSON.stringify({
        name: "titlemenu",
        type: "guibehaviour",
        cursor: "cursor",
        buttons: [
            "playbutton",
            "howtoplaybutton"
        ],
        actions: [
            {
                listen: "KEY_DOWN",
                key: 76,
                response: "cursorSelect"
            },
            {
                listen: "KEY_DOWN",
                key: 87,
                response: "moveCursorUp"
            },
            {
                listen: "KEY_DOWN",
                key: 83,
                response: "moveCursorDown"
            }
        ]
    })));
    let gb = new GUIBehaviour(gbBD);
    let e = new Entity({name: "test"});
    gb.setOwner(e);
    it("should have a name", () => {
        expect(gb.name).not.toBeUndefined;
    });
});