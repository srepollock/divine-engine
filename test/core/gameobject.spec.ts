import "mocha";
import { expect } from "chai";
import { GameObject } from "../../src";
import { FlagComponent } from "../../src";
import { Transform } from "../../src";

describe("GameObject unit testing", () => {
    var go: GameObject;
    describe("empty game object", () => {
        go = new GameObject();
        it("should have an empty id", () => {
            expect(go.id).to.be.equal("");
        });
        it("should be set to 0,0 coordinates", () => {
            expect(go.transform).to.be.deep.equal({x:0,y:0});
        });
        it("should have no components", () => {
            expect(go.components).to.be.empty; // DEBUG: not a function
        });
        it("should have no children", () => {
            expect(go.children).to.be.empty("Array"); // DEBUG: not a function
        });
    });
    describe("game object with id", () => {
        go = new GameObject("template");
        it("should have an id: \"template\"", () => {
            expect(go.id).to.be.equal("template");
        });
        it("should be set to 0,0 coordinates", () => {
            expect(go.transform).to.be.deep.equal({x:0,y:0});
        });
        it("should have no components", () => {
            expect(go.components).to.be.empty("Array");
        });
        it("should have no children", () => {
            expect(go.children).to.be.empty("Array");
        });
    });
    describe("game object with id and new coordinates", () => {
        go = new GameObject("template", {x:11, y:23});
        it("should have an empty id", () => {
            expect(go.id).to.be.equal("template");
        });
        it("should be set to 11,23 coordinates", () => {
            expect(go.transform).to.be.deep.equal({x:11, y:23});
        });
        it("should have no components", () => {
            expect(go.components).to.be.empty("Array");
        });
        it("should have no children", () => {
            expect(go.children).to.be.empty("Array");
        });
    });
    describe("game object with id, new coordinates, and 1 component", () => {
        go = new GameObject("template", 
            {x:30, y:-10}, 
            [], 
            [new FlagComponent("",new Transform(0, 0))]
        );
        it("should have an empty id", () => {
            expect(go.id).to.be.equal("template");
        });
        it("should be set to 0,0 coordinates", () => {
            expect(go.transform).to.be.equal({x:0, y:0});
        });
        it("should have a component", () => {
            expect(go.components).not.to.be.empty("Array");
        });
        it("should be a flag component", () => {
            expect(go.hasComponent("FlagComponent")).to.be.true;
        })
        it("should have no children", () => {
            expect(go.children).to.be.empty("Array");
        });
    });
    describe("add components to object", () => {
        go = new GameObject();
        it("should insert a new component", () => {
            go.addComponents(new FlagComponent(new Transform(0,0)));
            expect(go.hasComponent("FlagComponent")).to.be.true;
        });
    })
});