import { TextureManager } from "../../../src";

describe("TextureManager Unit Tests", () => {
    it("should add a new texture to the TextureManager", () => {
        // REVIEW: This requires the GLUtility class to be created.
        // NOTE: Needs puppeteer
        // TextureManager.getTexture("test");
        // expect(TextureManager.getTexture("test")).not.toBeUndefined;
    });
    it("should release a texture from the manager", () => {
        expect(TextureManager.releaseTexture("test")).toBeCalled;
    });
});