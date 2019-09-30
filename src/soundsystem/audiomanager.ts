import { SoundEffect } from "./soundeffect";

export class AudioManager {
    private static _soundEffects: Map<string, SoundEffect> = new Map();
    /**
     * Class constructor.
     */
    private constructor() {

    }
    /**
     * Initializes the manager.
     * @returns void
     */
    public static initialize(): void {
        new AudioManager();
    }
    /**
     * Loads a sound file into the manager.
     * @param  {string} name
     * @param  {string} assetPath
     * @param  {boolean} loop
     * @returns void
     */
    public static loadSoundFile(name: string, assetPath: string, loop: boolean): void {
        AudioManager._soundEffects.set(name, new SoundEffect(assetPath, loop));
    }
    /**
     * Plays a sound by the name that's been loaded into the engine.
     * @param  {string} name
     * @returns void
     */
    public static playSound(name: string): void {
        if (AudioManager._soundEffects.get(name) !== undefined) {
            AudioManager._soundEffects.get(name)!.play();
        }
    }
    /**
     * Stops playing a sound by the name.
     * @param  {string} name
     * @returns void
     */
    public static stopSound(name: string): void {
        if (AudioManager._soundEffects.get(name) !== undefined) {
            AudioManager._soundEffects.get(name)!.stop();
        }
    }
    /**
     * Pauses playing a sound by the name.
     * @param  {string} name
     * @returns void
     */
    public static pauseSound(name: string): void {
        if (AudioManager._soundEffects.get(name) !== undefined) {
            AudioManager._soundEffects.get(name)!.pause();
        }
    }
    /**
     * Pauses all sounds that have been loaded.
     * @returns void
     */
    public static pauseAll(): void {
        AudioManager._soundEffects.forEach((fx) => {
            fx.pause();
        });
    }
    /**
     * Stops all sounds that have been loaded.
     * @returns void
     */
    public static stopAll(): void {
        AudioManager._soundEffects.forEach((fx) => {
            fx.stop();
        });
    }
}