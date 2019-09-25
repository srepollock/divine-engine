import { Entity, TextComponentData, TextComponent } from "../../../src";
describe("ScoringComponent Integration Test", () => {
	let tcCD = new TextComponentData(JSON.parse(JSON.stringify({
        name: "test",
        text: "Hello world!"
    })));
    let tc = new TextComponent(tcCD);
    let e = new Entity({name: "test"});
    tc.setOwner(e);
    it("should have a name", () => {
        tc.update(1);
        expect(tc.name).toBe("test")
    });
    it("should have some text", () => {
        tc.update(1);
        expect(tc.text).toBe("Hello world!")
    });
    it("should update text when called", () => {
        tc.load();
        expect(tc.text).toBe("Hello world!");
    });
});