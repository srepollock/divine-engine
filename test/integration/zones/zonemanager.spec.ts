import { AssetManager, Message, MessageBus, ZoneManager, JsonAsset } from "../../../src";
describe("ZoneManager Integration Tests", () => {
    ZoneManager.initialize();
    AssetManager.initialize();
    it("should change the zone and get the active zone index; should be 0", () => {
        // REVIEW: Requires asset manager and message system to function.
        AssetManager.onAssetLoaded(new JsonAsset("testzone", JSON.parse(JSON.stringify({"name": "testzone","description": "testzone","id": "","objects": [{"name": "testobject","transform": {"position": {"x": 0,"y": 0}},"children": [],"components": [],"behaviours": []}]}))));
        ZoneManager.registerZone("testzone");
        ZoneManager.changeZone(0);
        expect(ZoneManager.activeZoneIndex).toBe(0);
    });
});