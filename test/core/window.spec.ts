import { expect } from "chai";
import "mocha";
import { Engine, EngineArguments, Window } from "../../src";

describe("Window unit tests", () => {
    let engArgs: EngineArguments = JSON.parse(JSON.stringify({title: " ", width: 0, height: 0, debug: false}));
    Engine.start(engArgs);
    it("should start and create a web worker", () => {
        // expect(Window.instance.webWorker).to.equal(undefined);
    });
    it("should have a reference to the engine", () => {
        expect(Window).to.respondTo("update");
    });
    it("should create a web worker", () => {
        // expect(Window).to.haveOwnProperty("_webWorker");
    });
    it("should have a refresh function", () => {
        expect(Window).itself.to.respondTo("refresh");
    });
    it("should refresh the web worker", () => {
        Window.refresh();
        expect(Window).itself.to.respondTo("refresh");
    });
    it("should kill the web worker on shutdown", () => {
        expect(Window.instance).to.not.equal(undefined);
        Window.shutdown();
        expect(Window.instance).to.equal(undefined);
    });
    Engine.stop();
});