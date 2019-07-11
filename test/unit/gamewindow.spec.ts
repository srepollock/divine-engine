import "mocha";
import { Engine, EngineArguments, GameWindow } from "../../lib/divine.es";

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
        // TODO: Fix this to run a test
        expect(false);
    });
    it("should create a web worker", () => {
        // expect(Window).to.haveOwnProperty("_webWorker");
    });
    it("should have a refresh function", () => {
        // TODO: Fix this to run a test
        expect(false);
    });
    it("should refresh the web worker", () => {
        Engine.instance.gameWindow.refresh();
        expect(false);
    });
    it("should kill the web worker on shutdown", () => {
        expect(GameWindow.started).toBe(true);
        Engine.instance.gameWindow.shutdown();
        expect(GameWindow.started).toBe(false);
    });
    Engine.stop();
});