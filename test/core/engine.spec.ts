import { expect } from "chai";
import "lodash";
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
        it("should set the source of the engine context (console, browser, electron)", () => {
            expect(Engine.client).to.equal(0); // 0 as it is the index in the Client enum
        });
        it("should have height set to 0", () => {
            expect(Engine.height).to.be.equal(0);
        });
        it("should have width set to 0", () => {
            expect(Engine.width).to.be.equal(0);
        });
        it("should shutdown and close on shutdown", () => {
            // This prints an error message to the console, and it should.
            Engine.shutdown();
            expect(Engine.instance).to.be.undefined;
        });
        after(() => {
            Engine.stop();
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
            setTimeout(() => {}, 5000);
            expect(Engine.now).not.to.equal(Date.now()); // Should be a new frame
            setTimeout(() => {}, 5000);
            expect(Engine.now).not.to.equal(Date.now()); // Should be a new frame
        });
        after(() => {
            Engine.stop();
        });
    });
    it("should initialize the subsystems on startup", () => {
        expect(true);
        Engine.start(new EngineArguments());
        // NOTE: Order is important
        expect(Engine.instance.messageSystem).to.not.be.undefined;
        expect(Engine.instance.ioSystem).to.not.be.undefined;
        expect(Engine.instance.renderSystem).to.not.be.undefined;
        expect(Engine.instance.physicsSystem).to.not.be.undefined;
        expect(Engine.instance.physicsSystem).to.not.be.undefined;
    });
});
