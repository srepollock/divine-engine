import { expect } from "chai";
import "mocha";
import { Engine, EngineArguments } from "../../src";

describe("Engine unit testing", () => {
    let engArgs: EngineArguments = JSON.parse(JSON.stringify({width: 0, height: 0, debug: false}));
    describe("Engine initialization", () => {
        before(() => {
            Engine.start(engArgs);
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
        it("should shutdown and close on shutdown", () => {
            Engine.shutdown();
            expect(Engine.instance).to.be.undefined;
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
        it("should stop running the main loop when stop is called; must create a new isntance", () => {
            Engine.stop();
            expect(Engine.running).to.be.false;
            expect(Engine.started).to.be.true;
            expect(Engine.instance).to.not.be.undefined;
        });
        it("should restart running when play is pressed", () => {
            Engine.play();
            expect(Engine.running).to.be.true;
            expect(Engine.started).to.be.true;
            expect(Engine.instance).to.not.be.undefined;
        });
        it("should pause the scene; running time is the same after a 5000ms sleep", () => {
            Engine.pause();
            expect(Engine.running).to.be.false; // Not running but,
            expect(Engine.started).to.be.true; // still "on"
            let time = Engine.now;
            expect(Engine.now).to.equal(time);
            setTimeout(() => {}, 5000);
            expect(Engine.now).to.equal(time);
        });
        it("should resume the scene", () => {
            expect(Engine.running).to.be.false;
            Engine.play();
            expect(Engine.running).to.be.true;
            let time = Engine.now;
            setTimeout(() => {}, 5000);
            expect(Engine.now).to.equal(time); // Should be a new frame
            setTimeout(() => {}, 5000);
            expect(Engine.now).to.equal(time); // Should be a new frame
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
