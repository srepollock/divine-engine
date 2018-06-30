import { expect } from "chai";
import "mocha";
import { Entity, Scene } from "../../src";

let entityArray: Entity[] = [new Entity("e1"), new Entity("e2"), 
    new Entity("e3")];

describe("Scene unit tests", () => {
    // Tests
    describe("Empty initialization", () => {
        let scene: Scene = new Scene();
        it("should not have a scene manager");
        it("should have a entity array", () => {
            expect(scene).to.haveOwnProperty("entityArray");
            expect(scene.entityArray).to.be.an("array");
        });
        it("should have an empty entity array", () => {
            expect(scene.entityArray).to.have.lengthOf(0);
        });
        it("should have a start function", () => {
            expect(scene).to.respondTo("start");
        });
        it("should have a restart function", () => {
            expect(scene).to.respondTo("restart");
        });
        it("should have a pause function", () => {
            expect(scene).to.respondTo("stop");
        });
    });
    describe("Scene with entity initializations", () => {
        let scene2: Scene = new Scene(entityArray);
        it("should have an entity array with 3 entities in it", () => {
            expect(scene2.entityArray).to.have.lengthOf(3);
        });
    });
    describe("Scene with a scene manager", () => {
        let scene3: Scene = new Scene(); // NOTE: add a scene manager here
        it("should have a scene manager");
    });
});