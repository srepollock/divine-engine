import { Component, Transform } from "../core";

export class FlagComponent implements Component {
    private static staticFlagnumber: number = 0;
    public id: string = "FlagComponent";
    private flagnumber: number;
    constructor(
        public location: Transform = new Transform()
    ) {
        this.flagnumber = ++FlagComponent.staticFlagnumber;
        this.location = location;
    }
    public getFlagnumber(): number {
        return this.flagnumber;
    }
}