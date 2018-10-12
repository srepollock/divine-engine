import { expect } from "chai";
import { Scene } from "../../src";
import { readJSONFile, readJSONFileAsScene } from "../../src/core/helperfunctions";

describe("Helper function tests", () => {
    describe("Reading JSON file", () => {
        it("should read the testscene in assets one level above and return a string", () => {
            let data: string = readJSONFile("../assets/testscene.json");
            expect(data).to.be("string");
        });
        it("should read the testscene in assets one level above and return a Scene object", () => {
            let data: Scene = readJSONFileAsScene("../assets/testscene.json");
            expect(data).to.be("Scene");
        });
    });
    describe("Writing JSON file", () => {

    });
});