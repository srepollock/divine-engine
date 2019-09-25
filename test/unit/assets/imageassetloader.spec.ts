import { ImageAssetLoader } from "../../../src";

describe("ImageAssetLoader Unit Test", () => {
    let ial = new ImageAssetLoader();
    it("should have a list of web accepted image formats", () => {
        expect(ial.supportedExtensions).toStrictEqual(["png", "gif", "jpg", "jpeg"])
    });
});