import {expect} from "chai";
import {printHelloWorld} from "../../src";
describe("Hello world", () => {
    it("should return hello world", () => {
        expect(printHelloWorld()).to.equal("Hello world");
    });
});