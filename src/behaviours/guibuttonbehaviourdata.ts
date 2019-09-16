import { InputManager } from "../inputsystem/inputmanager";
import { Keys } from "../inputsystem/keys";
import { Behaviour } from "./behaviour";
import { GUIButtonBehaviourData } from "./guibuttonbehaviour";

export class GUIButtonBehaviour extends Behaviour {
    public zoneName: string;
    constructor(data: GUIButtonBehaviourData) {
        super(data);
        this.zoneName = data.zoneName;
    }
    public update(delta: number): void {
        super.update(delta);
    }
}