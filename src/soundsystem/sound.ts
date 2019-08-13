import { ISound } from "./isound";
import { SoundAction } from "./soundaction";

export class Sound implements ISound {
    constructor(public url: string, public action: SoundAction, public callback: () => any) {

    }
}