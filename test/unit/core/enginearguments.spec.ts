import { EngineArguments } from "../../../src";

describe("EngineArguments Unit Tests", () => {
    it("should have default values with no parameters given", () => {
        let ea = new EngineArguments();
        expect(ea.debug).toBe(false);
        expect(ea.fps).toBe(60);
        expect(ea.height).toBe(0);
        expect(ea.width).toBe(0);
        expect(ea.rootElementId).toBe("");
        expect(ea.scene).toBe("");
        expect(ea.sceneManager).toBe(undefined);
        expect(ea.title).toBe("");
    });
    it("should take a width and height argument and have them set to 100", () => {
        let ea = new EngineArguments({width: 100, height: 100});
        expect(ea.width).toBe(100);
        expect(ea.height).toBe(100);
    });
    it("should get the entire object as a JSON Object when parsed", () => {
        let ea = new EngineArguments();
        expect(JSON.parse(ea.toString())).toBeInstanceOf(Object);
    });
});