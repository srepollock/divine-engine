import { Entity, OpeningGUIBehaviour, OpeningGUIBehaviourData } from "../../../src";
describe("OpeningGUIBehaviour Integration Test", () => {
    let ogbBD = new OpeningGUIBehaviourData();
    ogbBD.setFromJson(JSON.parse(JSON.stringify({
        name: "nextSceneclick",
        type: "openingguibehaviour",
        actions: [{
                listen: "MOUSE_DOWN",
                response: "nextScene"
            },
            {
                listen: "MOUSE_UP",
                response: "nextScene"
            },
            {
                listen: "KEY_DOWN",
                response: "nextScene"
            },
            {
                listen: "KEY_UP",
                response: "nextScene"
            }
        ]
    })));
    let ogb = new OpeningGUIBehaviour(ogbBD);
    let e = new Entity({name: "test"});
    ogb.setOwner(e);
    it("should have a name", () => {
        expect(ogb.name).not.toBeUndefined;
    });
});