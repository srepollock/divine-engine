export class SoundEffect {
    private _player: HTMLAudioElement | undefined;
    private _assetPath: string;
    public get assetPath(): string {
        return this._assetPath;
    }
    public get loop(): boolean {
        return this._player!.loop;
    }
    public set loop(value: boolean) {
        this._player!.loop = value;
    }
    public constructor(assetPath: string, loop: boolean) {
        this._assetPath = assetPath;
        this._player = new Audio(this._assetPath);
        this._player.loop = loop;
    }
    public play(): void {
        if (!this._player!.paused) {
            this.stop();
        }
        this._player!.play();
    }
    public pause(): void {
        this._player!.pause();
    }
    public stop(): void {
        this._player!.pause();
        this._player!.currentTime = 0;
    }
    public destroy(): void {
        this._player = undefined;
    }
}