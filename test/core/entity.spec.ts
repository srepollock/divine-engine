import { expect } from "chai";
import "mocha";
import { Entity, FlagComponent, LogInfo, Transform } from "../../src";

describe("Entity unit testing", () => {
    describe("Empty Entity object", () => {
        let go1: Entity = new Entity();
        it("should have an empty id", () => {
            expect(go1.id).to.be.equal("");
        });
        it("should be set to 0,0 coordinates", () => {
            expect(go1.transform).to.be.deep.equal({x: 0, y: 0});
        });
        it("should have no components", () => {
            expect(go1.components).to.be.an("array").that.is.empty;
        });
        it("should have no children", () => {
            expect(go1.children).to.be.an("array").that.is.empty;
        });
        it("should be able to print the object with toString()", () => {
            expect(go1).respondsTo("toString");
        });
    });
    describe("Entity object with id", () => {
        let go2: Entity = new Entity("template");
        it("should have an id: \"template\"", () => {
            expect(go2.id).to.be.equal("template");
        });
        it("should be set to 0,0 coordinates", () => {
            expect(go2.transform).to.be.deep.equal({x: 0, y: 0});
        });
        it("should have no components", () => {
            expect(go2.components).to.be.an("array").that.is.empty;
        });
        it("should have no children", () => {
            expect(go2.children).to.be.an("array").that.is.empty;
        });
    });
    describe("Entity object with id and new coordinates", () => {
        let go3: Entity = new Entity("template", {x: 11, y: 23});
        it("should have an empty id", () => {
            expect(go3.id).to.be.equal("template");
        });
        it("should be set to 11,23 coordinates", () => {
            expect(go3.transform).to.be.deep.equal({x: 11, y: 23});
        });
        it("should have no components", () => {
            expect(go3.components).to.be.an("array").that.is.empty;
        });
        it("should have no children", () => {
            expect(go3.children).to.be.an("array").that.is.empty;
        });
    });
    describe("Entity object with id, new coordinates, and 1 component", () => {
        let go4: Entity = new Entity("template", 
            {x: 30, y: -10}, 
            [], 
            [new FlagComponent(new Transform(0, 0))]
        );
        it("should have an empty id", () => {
            expect(go4.id).to.be.equal("template");
        });
        it("should be set to 30,-10 coordinates", () => {
            expect(go4.transform).to.be.deep.equal({x: 30, y: -10});
        });
        it("should have a component", () => {
            expect(go4.components).to.be.an("array").that.is.not.empty;
        });
        it("should be a flag component", () => {
            expect(go4.hasComponent("FlagComponent")).to.be.true;
        });
        it("should have no children", () => {
            expect(go4.children).to.be.an("array").that.is.empty;
        });
    });
    describe("Add components to object", () => {
        let go5: Entity = new Entity();
        it("should add a new component", () => {
            go5.addComponent(new FlagComponent(new Transform(0, 0)));
            expect(go5.hasComponent("FlagComponent")).to.be.true;
        });
        it("should get the entities component that equals 1", () => {
            let comp = go5.getComponent("FlagComponent") as FlagComponent;
            LogInfo("" + comp.getFlagnumber());
            expect(comp.getFlagnumber()).to.equal(4);
        });
        it("should add multiple components to the entity");
    });
});