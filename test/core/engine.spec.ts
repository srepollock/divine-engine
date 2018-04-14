import "mocha";
import { expect } from "chai";
import { Engine } from "../../src";

describe("Engine unit testing", () => {
    var eng: Engine = Engine.start(300,400,() => {});
    describe("Engine initialization", () => {
        it("should not be undefined", () => {
            expect(eng).to.not.be.undefined;
        });
        describe("Property checking", () => {
            it("should have an instance property");
            it("should have an started property initialized as false");
            it("should have an running property initialized as false");
            it("should have a height property initialized as 300", () => {
                expect(eng).to.have.property("height");
                expect(eng).to.have.property("height").to.equal(300);
            });
            it("should have a width property initialized as 400", () => {
                expect(eng).to.have.property("width");
                expect(eng).to.have.property("width").to.equal(400);
            });
            it("should have a message system");
            it("should have a render system");
            it("should have a physics system");
            it("should have a input system");
            it("should have a sound system");
        });
    });
    describe("Engine start", () => {
        it("should have started", () => {
            expect(Engine.started).to.equal(true, "engine should have started");
        });
        it("should be running the udpate loop");
        describe("Enging initializes systems", () => {
            it("should initialize the message system first");
            it("should initialize the render system second");
            it("should initialize the physics system third");
            it("should initialize the input system fourth");
            it("should initialize the sound system last")
        });
    });
    describe("Engine stop", () => {
        it("should stop when engine calls stop");
        it("should clean up all the systems");
    });
    describe("Engien exit", () => {
        it("should exit the game");
    });
});