import { DialogBehaviour, DialogBehaviourData, Entity } from "../../../src";

describe("EnemyBehaviour Integration Test", () => {
    let dbBD = new DialogBehaviourData();
    dbBD.setFromJson(JSON.parse(JSON.stringify({
        name: "beginningdialog",
        type: "dialog",
        spriteName: "dialogsprite",
        dialogs: [
            {
                materialName: "howtoplay_banner",
                startTime: 2,
                duration: 5
            }
        ]
    })));
    let db = new DialogBehaviour(dbBD);
    let e = new Entity({name: "test"});
    db.setOwner(e);
    it("should get the index of the dialogs", () => {
        expect(db.dialogIndex).toBe(0);
    });
    it("should set the index of the dialogs", () => {
        db.dialogIndex = -1;
        expect(db.dialogIndex).toBe(-1);
    });
    it("should get the list of dialogs", () => {
        expect(db.dialogs).not.toBeUndefined();
    });
    it("should update and not run the first index, as the start time has not yet hit", () => {
        db.update(1);
        // TODO: Check here
    });
});