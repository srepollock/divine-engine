import { Client } from "../../../src"
describe("Client Unit Tests", () => {
    it("should get each client as a code", () => {
        expect(Client.Console).toBe(0);
        expect(Client.Browser).toBe(1);
        expect(Client.Electron).toBe(2);
    });
});