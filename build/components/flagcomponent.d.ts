import { Component } from "../core";
import { Transform } from "../core";
export declare class FlagComponent implements Component {
    location: Transform;
    private static s_flagnumber;
    private flagnumber;
    id: string;
    constructor(location?: Transform);
    getFlagnumber(): number;
}
