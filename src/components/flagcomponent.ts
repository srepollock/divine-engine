import {Component} from "../core";
import {Transform} from "../core";

export class FlagComponent implements Component {
    public id: string = "FlagComponent";
    constructor(
        public location: Transform = new Transform()
    ) {
        this.location = location
    }
}