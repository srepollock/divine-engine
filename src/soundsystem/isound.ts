import { SoundAction } from "./soundaction";

/**
 * Interface for a sound object.
 */
export interface ISound {
    url: string;
    action: SoundAction;
    callback: () => any;
}