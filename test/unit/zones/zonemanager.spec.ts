import { ZoneManager } from "../../../src";

describe("ZoneManager unit tests", () => {
    ZoneManager.initialize();
    it("should have an instance when initialized", () => {
        expect(ZoneManager.instance).not.toBeUndefined;
    });
    it("should register a zone", () => {
        ZoneManager.registerZone("../../../assets/testzone.json");
    });
    it("should get a registered zone's index", () => {
        expect(ZoneManager.getRegisteredZoneIndex("testzone")).toBe(0);
    });
    it("should change the zone based on the index given", () => {
        ZoneManager.registerZone("../../../assets/testzone.json");
        expect(ZoneManager.changeZone(1)).toBeCalled;
    });
});