import { TextureReferenceNode, Texture } from "../../../src";

describe("TextureReferenceNode Unit Tests", () => {
    let trn = new TextureReferenceNode(new Texture("temp"));
    it("should have a texture and a reference count", () => {
        expect(trn.texture).not.toBeUndefined;
        expect(trn.referenceCount).toBe(1);
    });
});