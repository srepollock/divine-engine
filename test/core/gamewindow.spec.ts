import { expect } from "chai";
import "mocha";
import { Engine, EngineArguments, GameWindow } from "../../src";

describe("Game window unit tests", () => {
    Engine.start(new EngineArguments());
    describe("Empty instantiation", () => {
        it("should have the empty title", () => {
            expect(GameWindow.title).to.equal("");
        });
        it("should be able to set game window title", () => {
            GameWindow.title = "Template";
            expect(GameWindow.title).to.equal("Template");
        });
        it("should have a width and a height", () => {
            expect(GameWindow).to.respondTo("width");
            expect(GameWindow).to.respondTo("height");
        });
    });
});