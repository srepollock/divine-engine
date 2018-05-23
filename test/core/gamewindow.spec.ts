import { expect } from "chai";
import "mocha";
import { GameWindow } from "../../src";

describe("GameWindow unit testing", () => {
    describe("Empty initialization", () => {
        it("should have an empty title");
        it("should have height set to 0");
        it("should have width set to 0");
        
        it("should close the game window");
    });
    describe("Initialization of window to 400, 300", () => {
        it("should have height set to 400");
        it("should have width set to 300");
    });
    describe("Resizing 400, 300 to 1200, 900", () => {
        it("should resize to 1200, 900");
    });
});