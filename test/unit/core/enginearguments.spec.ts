import { EngineArguments } from "../../../src";

describe("EngineArguments Unit Tests", () => {
    it("should have default values with no parameters given", () => {
        let ea = new EngineArguments();
        expect(ea.debug).toBe(false);
        expect(ea.fps).toBe(60);
        expect(ea.title).toBe("");
    });
    it("should get the entire object as a JSON Object when parsed", () => {
        let ea = new EngineArguments();
        expect(JSON.parse(ea.toString())).toBeInstanceOf(Object);
    });
});