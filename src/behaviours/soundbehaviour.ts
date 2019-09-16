import { AudioManager } from "../soundsystem";
import { Behaviour } from "./behaviour";
import { SoundBehaviourData } from "./soundbehaviourdata";
export class SoundBehaviour extends Behaviour {
    private _soundName: string;
    /**
     * Class constructor.
     * @param  {SoundBehaviourData} data
     */
    constructor(data: SoundBehaviourData) {
        super(data);
        this._soundName = data.soundName;
        AudioManager.playSound(this._soundName);
    }
    /**
     * Updates the sound behaviour.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        super.update(delta);
    }
}