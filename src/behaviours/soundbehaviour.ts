import { AudioManager } from "../soundsystem";
import { Behaviour } from "./behaviour";
import { SoundBehaviourData } from "./soundbehaviourdata";
export class SoundBehaviour extends Behaviour {
    private _soundName: string;
    constructor(data: SoundBehaviourData) {
        super(data);
        this._soundName = data.soundName;
        AudioManager.playSound(this._soundName);
    }
    public update(delta: number): void {
        super.update(delta);
    }
}