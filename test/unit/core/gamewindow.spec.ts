import { Client, DObject, GameWindow } from "../../../src";
describe("GameWindow unit tests", () => {
    new GameWindow("GameWindow Unit Test", Client.Electron);
    it("should be a child of DObject", () => {
        expect(GameWindow).toBeInstanceOf(DObject);
    });
    it("should create a window that is empty ", () => {
        expect(GameWindow.height).toBe(-1);
        expect(GameWindow.width).toBe(-1);
    });
});