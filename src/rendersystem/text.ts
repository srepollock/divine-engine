import { Vector2, Matrix4 } from "src/math";
import { Shader } from "./shader";
import { log, LogLevel, ErrorCode } from "de-loggingsystem";

export class Text {
    protected _name: string;
    protected _text: string = "";
    protected _textArea!: HTMLTextAreaElement;
    /**
     * Gets the name of the text.
     * @returns string
     */
    public get name(): string {
        return this._name;
    }
    /**
     * Gets the current text.
     * @returns string
     */
    public get text(): string {
        return this._text;
    }
    /**
     * Sets the current text
     * @param  {string} value
     */
    public set text(value: string) {
        this._text = value;
    }
    /**
     * Class constructor.
     * @param  {string} name
     */
    constructor(name: string) {
        this._name = name;
    }
    /**
     * Destroys the text.
     * @returns void
     */
    public destroy(): void {
        
    }
    /**
     * Draws the text.
     * @param  {Shader} shader
     * @param  {Matrix4} model
     * @returns void
     */
    public draw(shader: Shader, model: Matrix4): void {
        
    }
    /**
     * Loads the text.
     * @returns void
     */
    public load(): void {
        this._textArea = document.body.appendChild(document.createElement("textarea"));
        this._textArea.readOnly = true;
        this._textArea.cols = 50;
        this._textArea.rows = 1;
    }
    /**
     * Updates the text.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        this._textArea.textContent = this._text;
    }
}