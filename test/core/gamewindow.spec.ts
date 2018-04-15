import "mocha";
import { expect } from "chai";
import {GameWindow} from "../../src";

describe("GameWindow unit testing", () => {
    describe("Empty initialization", () => {
        var gw: GameWindow = new GameWindow();
        it("should have an empty title", () => {
            expect(gw.title).to.be.empty;
        });
        it("should have height set to 0", () => {
            expect(gw.height).to.be.equal(0);
        });
        it("should have width set to 0", () => {
            expect(gw.height).to.be.equal(0);
        });
    });
    describe("Initialization of window to 400, 300", () => {
        var gw: GameWindow = new GameWindow("", 400, 300);
        it("should have height set to 400", () => {
            expect(gw.height).to.be.equal(400);
        });
        it("should have width set to 300", () => {
            expect(gw.width).to.be.equal(300);
        });
    });
    describe("Resizing 400, 300 to 1200, 900", () => {
        var gw: GameWindow = new GameWindow("", 400, 300);
        it("should resize to 1200, 900", () => {
            gw.resize(1200, 900);
            expect(gw.height).to.be.equal(1200);
            expect(gw.width).to.be.equal(900);
        });
    });
});