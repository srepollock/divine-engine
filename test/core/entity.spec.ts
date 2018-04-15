import "mocha";
import { expect } from "chai";
import { Entity } from "../../src";
import { FlagComponent } from "../../src";
import { Transform } from "../../src";

describe("Entity unit testing", () => {
    describe("Empty Entity object", () => {
        var go: Entity = new Entity();
        it("should have an empty id", () => {
            expect(go.id).to.be.equal("");
        });
        it("should be set to 0,0 coordinates", () => {
            expect(go.transform).to.be.deep.equal({x:0,y:0});
        });
        it("should have no components", () => {
            expect(go.components).to.be.an("array").that.is.empty;
        });
        it("should have no children", () => {
            expect(go.children).to.be.an("array").that.is.empty;
        });
    });
    describe("Entity object with id", () => {
        var go: Entity = new Entity("template");
        it("should have an id: \"template\"", () => {
            expect(go.id).to.be.equal("template");
        });
        it("should be set to 0,0 coordinates", () => {
            expect(go.transform).to.be.deep.equal({x:0,y:0});
        });
        it("should have no components", () => {
            expect(go.components).to.be.an("array").that.is.empty;
        });
        it("should have no children", () => {
            expect(go.children).to.be.an("array").that.is.empty;
        });
    });
    describe("Entity object with id and new coordinates", () => {
        var go: Entity = new Entity("template", {x:11, y:23});
        it("should have an empty id", () => {
            expect(go.id).to.be.equal("template");
        });
        it("should be set to 11,23 coordinates", () => {
            expect(go.transform).to.be.deep.equal({x:11, y:23});
        });
        it("should have no components", () => {
            expect(go.components).to.be.an("array").that.is.empty;
        });
        it("should have no children", () => {
            expect(go.children).to.be.an("array").that.is.empty;
        });
    });
    describe("Entity object with id, new coordinates, and 1 component", () => {
        var go: Entity = new Entity("template", 
            {x:30, y:-10}, 
            [], 
            [new FlagComponent(new Transform(0, 0))]
        );
        it("should have an empty id", () => {
            expect(go.id).to.be.equal("template");
        });
        it("should be set to 30,-10 coordinates", () => {
            expect(go.transform).to.be.deep.equal({x:30, y:-10});
        });
        it("should have a component", () => {
            expect(go.components).to.be.an("array").that.is.not.empty;
        });
        it("should be a flag component", () => {
            expect(go.hasComponent("FlagComponent")).to.be.true;
        })
        it("should have no children", () => {
            expect(go.children).to.be.an("array").that.is.empty;
        });
    });
    describe("add components to object", () => {
        var go: Entity = new Entity();
        it("should insert a new component", () => {
            go.addComponents(new FlagComponent(new Transform(0,0)));
            expect(go.hasComponent("FlagComponent")).to.be.true;
        });
    })
});