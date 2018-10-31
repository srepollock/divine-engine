import { expect } from "chai";
import "mocha";
import { Engine, EngineArguments, GameWindow } from "../../src";

describe("Window unit tests", () => {
    let engArgs: EngineArguments = JSON.parse(JSON.stringify({title: " ", width: 0, height: 0,  debug: false}));
    beforeEach(() => {
        Engine.stop();
        Engine.shutdown();
        Engine.start(engArgs);
    });
    it("should start and create a web worker", () => {
        // expect(Window.instance.webWorker).to.equal(undefined);
    });
    it("should have a reference to the engine", () => {
        expect(Engine.instance.gameWindow).to.respondTo("update");
    });
    it("should create a web worker", () => {
        // expect(Window).to.haveOwnProperty("_webWorker");
    });
    it("should have a refresh function", () => {
        expect(Engine.instance.gameWindow).itself.to.respondTo("refresh");
    });
    it("should refresh the web worker", () => {
        Engine.instance.gameWindow.refresh();
        expect(Engine.instance.gameWindow).itself.to.respondTo("refresh");
    });
    it("should kill the web worker on shutdown", () => {
        expect(GameWindow.started).to.equal(true);
        Engine.instance.gameWindow.shutdown();
        expect(GameWindow.started).to.equal(false);
    });
    Engine.stop();
});