import { expect } from "chai";
import { KeyCode } from "../../src";

describe("Key Input Message unit tests", () => {
    it("should be instantiable", () => {
        let message = new KeyInputMessage(KeyCode.A);
        expect(message).to.not.be.undefined;
        expect(message.code).to.equal(KeyCode.A);
    });
});