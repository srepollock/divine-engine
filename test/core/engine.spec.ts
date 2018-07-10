import { expect } from "chai";
import "mocha";
import { Engine, EngineArguments } from "../../src";

describe("Engine unit testing", () => {
    let engArgs: EngineArguments = JSON.parse("{\"height\": 0, \
    \"width\": 0, \"debug\": false}");
    describe("Engine initialization", () => {
        before(() => {
            Engine.start(engArgs);
        });
        after(() => {
            Engine.stop();
        });
        it("should have started", () => {
            expect(Engine.started).to.be.true;
        });
        it("should have height set to 0", () => {
            expect(Engine.height).to.be.equal(0);
        });
        it("should have width set to 0", () => {
            expect(Engine.width).to.be.equal(0);
        });
    });
    describe("Engine start and running", () => {
        before(() => {
            Engine.start(engArgs);
        });
        it("should start running when start is called", () => {
            expect(Engine.started).to.be.true;
        });
        it("should be running", () => {
            expect(Engine.running).to.be.true;
        });
        it("should stop when stop is called but still running", () => {
            Engine.stop();
            expect(Engine.running).to.be.false;
            expect(Engine.started).to.be.false;
            expect(Engine.instance).to.not.be.undefined;
        });
        it("should restart running when play is pressed", () => {
            Engine.play();
            expect(Engine.running).to.be.true;
            expect(Engine.started).to.be.true;
            expect(Engine.instance).to.not.be.undefined;
        });
    });
});

// describe("Engine unit testing", () => {
//     describe("Engine initialization", () => {
//         it("should not be undefined");
//         describe("Property checking", () => {
//             it("should have an instance property");
//             it("should have an started property initialized as false");
//             it("should have an running property initialized as false");
//             it("should have a height property initialized as 300");
//             it("should have a width property initialized as 400");
//             it("should have a message system");
//             it("should have a render system");
//             it("should have a physics system");
//             it("should have a input system");
//             it("should have a sound system");
//         });
//     });
//     describe("Engine start", () => {
//         it("should have started");
//         it("should be running the udpate loop");
//         describe("Enging initializes systems", () => {
//             it("should initialize the message system first");
//             it("should initialize the render system second");
//             it("should initialize the physics system third");
//             it("should initialize the input system fourth");
//             it("should initialize the sound system last")
//         });
//     });
//     describe("Engine stop", () => {
//         it("should stop when engine calls stop");
//         it("should clean up all the systems");
//     });
//     describe("Engien exit", () => {
//         it("should exit the game");
//     });
// });
