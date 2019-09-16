export class Color {
    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;
    /**
     * Class constructor.
     * @param  {number=255} r
     * @param  {number=255} g
     * @param  {number=255} b
     * @param  {number=255} a
     */
    constructor(r: number = 255, g: number = 255, b: number = 255, a: number = 255) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }
    /**
     * Gets the red value.
     * @returns number
     */
    public get r(): number {
        return this._r;
    }
    /**
     * Sets the red value.
     * @param  {number} value
     */
    public set r(value: number) {
        this._r = value;
    }
    /**
     * Gets the red as a float value.
     * @returns number
     */
    public get rFloat(): number {
        return this._r / 255.0;
    }
    /**
     * Gets the green value.
     * @returns number
     */
    public get g(): number {
        return this._g;
    }
    /**
     * Sets the green value.
     * @param  {number} value
     */
    public set g(value: number) {
        this._g = value;
    }
    /**
     * Gets the green value as a float.
     * @returns number
     */
    public get gFloat(): number {
        return this._g / 255.0;
    }
    /**
     * Gets the blue value.
     * @returns number
     */
    public get b(): number {
        return this._b;
    }
    /**
     * Sets the blue value.
     * @param  {number} value
     */
    public set b(value: number) {
        this._b = value;
    }
    /**
     * Gets the blue value as a float.
     * @returns number
     */
    public get bFloat(): number {
        return this._b / 255.0;
    }
    /**
     * Gets the alpha value.
     * @returns number
     */
    public get a(): number {
        return this._a;
    }
    /**
     * Sets the alpha value.
     * @param  {number} value
     */
    public set a(value: number) {
        this._a = value;
    }
    /**
     * Gets the alpha as a float.
     * @returns number
     */
    public get aFloat(): number {
        return this._a / 255.0;
    }
    /**
     * Gets a white color.
     * @returns Color
     */
    public static get white(): Color {
        return new Color();
    }
    /**
     * Gets a black color.
     * @returns Color
     */
    public static get black(): Color {
        return new Color(0, 0, 0);
    }
    /**
     * Gets a red color.
     * @returns Color
     */
    public static get red(): Color {
        return new Color(255, 0, 0);
    }
    /**
     * Gets a green color.
     * @returns Color
     */
    public static get green(): Color {
        return new Color(0, 255, 0);
    }
    /**
     * Gets a blue color.
     * @returns Color
     */
    public static get blue(): Color {
        return new Color(0, 0, 255);
    }
    /**
     * Gets the color as an array.
     * @returns Color
     */
    public toArray(): Array<number> {
        return [this._r, this._g, this._b, this._a];
    }
    /**
     * Gets the color as a float array.
     * @returns Color
     */
    public toFloatArray(): Array<number> {
        return [this.rFloat, this.gFloat, this.bFloat, this.aFloat];
    }
    /**
     * Gets the color as a float32 array.
     * @returns Color
     */
    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toFloatArray());
    }
}