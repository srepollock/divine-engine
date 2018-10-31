import { expect } from "chai";
import { KeyCode, KeyInputMessage } from "../../../../../src";

describe("Key Input Message unit tests", () => {
    it("should be instantiable", () => {
        let message = new KeyInputMessage(KeyCode.A);
        expect(message.code).to.equal(KeyCode.A);
    });
});