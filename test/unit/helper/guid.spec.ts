import { guid } from "../../../src/helper";
describe("GUID Unit Tests", () => {
    it("should create a unique global id in a string format", () => {
        let uid = guid();
        expect(uid).toEqual(expect.stringMatching("[a-z0-9]{8}-[a-z0-9]{8}-[a-z0-9]{8}-[a-z0-9]{8}"));
    });
});