import { MessageType } from "src/core";
import { ISound, SoundAction } from "src/soundsystem";
import { Component } from "./component";
export class SoundComponent extends Component {
    private _sounds: Array<ISound>;
    /**
     * Gets the array of ISound objects from the SoundComponent.
     * @returns ISound
     */
    public get sounds(): Array<ISound> {
        return this._sounds;
    }
    /**
     * SoundComponent constructor. Takes in an array of ISound objects.
     * @param  {[ISound]} ...args
     */
    constructor(...args: ISound[]) {
        super("sound.component");
        this._sounds = args;
        this._sounds.forEach((sound) => {
            this.registerSound(sound.url, sound.action, sound.callback);
        });
    }
    /**
     * Sends the sound url and action to the SoundSystem to allow for playing. The action determines when the sound 
     * triggers.
     * // TODO: Triggers will have to be sorted out.
     * @param  {string} url
     * @param  {SoundAction} action
     * @returns boolean
     */
    private registerSound(url: string, action: SoundAction, callback: () => {}): boolean {
        this.sendMessage(JSON.stringify({url, action, callback}), MessageType.Sound, true);
        // TODO: check that the sound has been registered.
        return true;
    }
}