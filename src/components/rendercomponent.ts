import { Component } from "../core";

export class RenderComponent implements Component {
    constructor(public id: string) {
        this.id = id;
    }
}