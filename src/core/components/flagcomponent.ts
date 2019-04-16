
import { Transform } from "../math";
import { Component } from "./component";

/**
 * Flag component to mark a location in the world. Very useful for testing.
 */
export class FlagComponent extends Component {
    private static FLAG_COMPONENT: string = "FlagComponent";
    private static staticFlagnumber: number = 0;
    private flagnumber: number;
    constructor(
        public location: Transform = new Transform()
    ) {
        super(FlagComponent.FLAG_COMPONENT);
        this.flagnumber = ++FlagComponent.staticFlagnumber;
        this.location = location;
    }
    public getFlagnumber(): number {
        return this.flagnumber;
    }
}
