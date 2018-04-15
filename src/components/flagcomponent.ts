import {Component} from "../core";
import {Transform} from "../core";

export class FlagComponent implements Component {
    private static s_flagnumber: number = 0;
    private flagnumber: number;
    public id: string = "FlagComponent";
    constructor(
        public location: Transform = new Transform()
    ) {
        this.flagnumber = ++FlagComponent.s_flagnumber;
        this.location = location
    }
    public getFlagnumber(): number {
        return this.flagnumber;
    }
}