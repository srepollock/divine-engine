import { ZoneManager } from "../../../src";

describe("ZoneManager unit tests", () => {
    ZoneManager.initialize();
    it("should have an instance when initialized", () => {
        expect(ZoneManager.instance).not.toBeUndefined;
    });
    it("should register a zone", () => {
        ZoneManager.registerZone("testzone.json");
    });
});