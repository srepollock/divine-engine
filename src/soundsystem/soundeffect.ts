export class SoundEffect {
    private _player: HTMLAudioElement | undefined;
    private _assetPath: string;
    /**
     * Gets the assets path.
     * @returns string
     */
    public get assetPath(): string {
        return this._assetPath;
    }
    /**
     * Gets if this sound is looping.
     * @returns boolean
     */
    public get loop(): boolean {
        return this._player!.loop;
    }
    /**
     * Sets the sound to loop.
     * @param  {boolean} value
     */
    public set loop(value: boolean) {
        this._player!.loop = value;
    }
    /**
     * Class constructor.
     * @param  {string} assetPath
     * @param  {boolean} loop
     */
    public constructor(assetPath: string, loop: boolean) {
        this._assetPath = assetPath;
        this._player = new Audio(this._assetPath);
        this._player.loop = loop;
    }
    /**
     * Plays this sound.
     * @returns void
     */
    public play(): void {
        this._player!.play();
    }
    /**
     * Pauses this sound.
     * @returns void
     */
    public pause(): void {
        this._player!.pause();
    }
    /**
     * Stops this sound.
     * @returns void
     */
    public stop(): void {
        this._player!.pause();
        this._player!.currentTime = 0;
    }
    /**
     * Destroys this sound.
     * @returns void
     */
    public destroy(): void {
        this._player = undefined;
    }
}