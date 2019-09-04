import { SoundEffect } from "./soundeffect";

export class AudioManager {
    private static _soundEffects: Map<string, SoundEffect> = new Map();
    private constructor() {

    }
    public static initialize(): void {

    }
    public static loadSoundFile(name: string, assetPath: string, loop: boolean): void {
        AudioManager._soundEffects.set(name, new SoundEffect(assetPath, loop));
    }
    public static playSound(name: string): void {
        if (AudioManager._soundEffects.get(name) !== undefined) {
            AudioManager._soundEffects.get(name)!.play();
        }
    }
    public static stopSound(name: string): void {
        if (AudioManager._soundEffects.get(name) !== undefined) {
            AudioManager._soundEffects.get(name)!.stop();
        }
    }
    public static pauseSound(name: string): void {
        if (AudioManager._soundEffects.get(name) !== undefined) {
            AudioManager._soundEffects.get(name)!.pause();
        }
    }
    public static pauseAll(): void {
        AudioManager._soundEffects.forEach((fx) => {
            fx.pause();
        });
    }
    public static stopAll(): void {
        AudioManager._soundEffects.forEach((fx) => {
            fx.stop();
        });
    }
}