import { expect } from "chai";
import "mocha";
import { Entity, FlagComponent, Log, Transform } from "../../src";

describe("Entity unit testing", () => {
    var entity: Entity;
    beforeEach(() => {
        entity = new Entity();
    });
    describe("Child entity objects", () => {
        it("should be instantiated with a parent ID", () => {
            let child: Entity = new Entity({parent: entity});
            expect(child.parent!.id).to.equal(entity.id);
        });
        it("should get 1 child entity object", () => {
            let child = new Entity({parent: entity, children: new Array(child)});
            expect(entity.getChild(child.id)).not.to.be.undefined;
            expect(entity.getChild(child.id)).to.deep.equal(child);
        });
        it("should have 1 child entity object", () => {
            let child = new Entity({parent: entity, children: new Array(child)});
            expect(entity.getChildren()).not.to.be.undefined;
            expect(entity.getChildren()).to.have.lengthOf(1) ;
        });
        it("should have a child that has the parent ID", () => {
            let child = new Entity({parent: entity, children: new Array(child)});
            expect(entity.getChildren()[0].parent!.id).to.equal(entity.id);
        });
    });
    describe("Empty Entity object", () => {
        let go1: Entity = new Entity();
        it("should have an empty tag", () => {
            expect(go1.tag).to.be.equal("");
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
    describe("Entity object with tag", () => {
        let go2: Entity = new Entity({tag: "template"});
        it("should have an tag: \"template\"", () => {
            expect(go2.tag).to.be.equal("template");
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
    describe("Entity object with tag and new coordinates", () => {
        let go3: Entity = new Entity({tag: "template", transform: {x: 11, y: 23}});
        it("should have an empty tag", () => {
            expect(go3.tag).to.be.equal("template");
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
    describe("Entity object with tag, new coordinates, and 1 component", () => {
        let go4: Entity = new Entity({tag: "template", 
            transform: {x: 30, y: -10},
            components: new Array(new FlagComponent(new Transform(0, 0))),
            children: new Array()
        });
        it("should have an empty tag", () => {
            expect(go4.tag).to.be.equal("template");
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
        let go5: Entity = new Entity({});
        it("should add a new component", () => {
            go5.addComponent(new FlagComponent(new Transform(0, 0)));
            expect(go5.hasComponent("FlagComponent")).to.be.true;
        });
        it("should get the entities component that equals 1", () => {
            let comp = go5.getComponent("FlagComponent") as FlagComponent;
            Log("" + comp.getFlagnumber());
            expect(comp.getFlagnumber()).to.equal(4);
        });
        it("should add multiple components to the entity");
    });
    
});
