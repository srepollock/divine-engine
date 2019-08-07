import { DObject } from "../core/dobject";
export class Component extends DObject {
    /**
     * The Component constructor.
     * *Note: All components must have a tag as such: {component_name}.component.*
     * @param  {string="component"} tag
     */
    constructor(tag: string = "component") {
        super(tag);
    }
}