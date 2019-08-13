import { IOSystem, Engine, EngineArguments } from "../../../src";

describe("IOSystem Unit Tests, relies on Engine", () => {
    Engine.start(new EngineArguments());
    beforeAll(() => {
        IOSystem.initialize();
    });
    it("should initialize and have no messages in the system stream", () => {
        expect(IOSystem.instance.messageQueue.length).toBe(0);
    });
    it("should get the input from the user", () => {
        // NOTE: This will need puppeteer
        expect(false).toBeTruthy();
    });
});