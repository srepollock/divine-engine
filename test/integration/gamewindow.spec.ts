import { DObject, GameWindow } from "../../src/core";
import { Client } from "../../src/helper";
describe("GameWindow Integration Tests", () => {
    // TODO: This will need puppeteer for both electron and browser
    expect(false).toBeTruthy;
    describe("Browser tests", () => {
        // new GameWindow("Browser GameWindow Integration Test", Client.Console);
        // it("should create a window that is a reference to the browser window", () => {
        //     expect(GameWindow.height).not.toBe(-1);
        //     expect(GameWindow.width).not.toBe(-1);
        // });
        // it("should get fullscreen", () => {
        //     expect(GameWindow.fullscreen = true).not.toThrow;
        // });
        // it("should get the height of the screen", () => {
        //     expect(GameWindow.height).toBe(600);
        // });
        // it("should get the width of the screen", () => {
        //     expect(GameWindow.width).toBe(800);
        // });
        // it("should set the title of the GameWindow", () => {
        //     GameWindow.title = "Testing";
        //     expect(GameWindow.title).toBe("Testing");
        // });
        // it("should get the mouse position", () => {
        //     expect(GameWindow.mousePosition).toBeTruthy;
        // });
        // it("should refresh the screen", () => {
        //     expect(GameWindow.refresh).toBeTruthy;
        // });
        // it("should resize the window on refresh", () => {
        //     expect(GameWindow.resize).toBeTruthy;
        // });
        // it("should toggle the developer tools", () => {
        //     expect(GameWindow.toggleDevTools).toBeTruthy;
        // });
        // it("should get the GameWindow as a string.", () => {
        //     GameWindow.title = "Title";
        //     expect(GameWindow.toString()).toBe("Title: w:800, h:600");
        // });
        // it("should close and cleanup the window", () => {
        //     expect(GameWindow.close()).toBeTruthy;
        // });
    });
    describe("Electron tests", () => {
        new GameWindow("Electron GameWindow Integration Test", Client.Console);
        // it("should create a window that is a reference to the browser window", () => {
        //     expect(GameWindow.height).not.toBe(-1);
        //     expect(GameWindow.width).not.toBe(-1);
        // });
        // it("should get fullscreen", () => {
        //     expect(GameWindow.fullscreen = true).not.toThrow;
        // });
        // it("should get the height of the screen", () => {
        //     expect(GameWindow.height).toBe(600);
        // });
        // it("should get the width of the screen", () => {
        //     expect(GameWindow.width).toBe(800);
        // });
        // it("should set the title of the GameWindow", () => {
        //     GameWindow.title = "Testing";
        //     expect(GameWindow.title).toBe("Testing");
        // });
        // it("should get the mouse position", () => {
        //     expect(GameWindow.mousePosition).toBeTruthy;
        // });
        // it("should refresh the screen", () => {
        //     expect(GameWindow.refresh).toBeTruthy;
        // });
        // it("should resize the window on refresh", () => {
        //     expect(GameWindow.resize).toBeTruthy;
        // });
        // it("should toggle the developer tools", () => {
        //     expect(GameWindow.toggleDevTools).toBeTruthy;
        // });
        // it("should get the GameWindow as a string.", () => {
        //     GameWindow.title = "Title";
        //     expect(GameWindow.toString()).toBe("Title: w:800, h:600");
        // });
        // it("should close and cleanup the window", () => {
        //     expect(GameWindow.close()).toBeTruthy;
        // });
    });
});