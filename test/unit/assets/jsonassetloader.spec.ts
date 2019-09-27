import { JsonAssetLoader } from "../../../src";

describe("JSONAssetLoader Unit Test", () => {
    let jal = new JsonAssetLoader();
    it("should have a list of accepted extensions", () => {
        expect(jal.supportedExtensions).toStrictEqual(["json"]);
    });
});