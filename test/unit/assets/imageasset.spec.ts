import { ImageAsset } from "../../../src";

describe("ImageAsset Unit Test", () => {
    let image = document.createElement('image') as HTMLImageElement;
    let ia = new ImageAsset("test", image);
    it("should have a name", () => {
        expect(ia.name).toBe("test");
    });
    it("should have data that is an HTMLImageElement", () => {
        expect(ia.data).toStrictEqual(document.createElement('image') as HTMLImageElement);
    });
    // it("should get the width", () => {
    //     expect(ia.width).toBe(0);
    // });
    // it("should get the height", () => {
    //     expect(ia.height).toBe(0);
    // });
});