import { Transform } from "../core/entity";
import { Component } from "./component";

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
