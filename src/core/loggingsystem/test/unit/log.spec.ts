import { expect } from "chai";
import { log } from "../../src/log";
import { LogLevel } from "../../src/loglevel";

describe("Log tests", () => {
    it("should log info", () => {
        expect(log(LogLevel.info, "Something cool")).to.contain("Info");
    });
    it("should log debug when NODE_DEBUG environment is true", () => {
        process.env.NODE_DEBUG = "true";
        expect(log(LogLevel.debug, "Debug environment only")).to.contain("Debug");
    });
    it("should not log debug when NODE_DEBUG is false or empty", () => {
        process.env.NODE_DEBUG = "false";
        expect(log(LogLevel.debug, "Debug environment only")).to.equal("");
    });
    it("should log warnings", () => {
        expect(log(LogLevel.warning, "Something to warn about")).to.contain("Warn");
    });
    it("should log errors and throw", () => {
        expect(log(LogLevel.error, "Something went wrong")).to.contain("Error");
    });
    it("should log criticals and throw", () => {
        /** 
         * Mocha/Chai checks that the function returns an error
         * See: https://stackoverflow.com/questions/21587122/mocha-chai-expect-to-throw-not-catching-thrown-errors
         */
        expect(() => {
            log(LogLevel.critical, "Something went terribly wrong")
        }).to.throw("Something went terribly wrong");
    });
});