import { Key } from "../inputsystem/key";
import { Component } from "./component";

export class KeyboardComponent extends Component {
    private _keys: Map<Key, () => {}>;
    constructor({keys}: {keys?: Map<Key, () => {}>} = {}) {
        super("keyboard.component");
        this._keys = (keys) ? keys : new Map<Key, () => {}>(); // REVIEW: Should I do it this way??
    }
}