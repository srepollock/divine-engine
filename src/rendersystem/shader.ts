import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { GLUtility } from "./glutility";

export abstract class Shader {
    private _name: string;
    private _program: WebGLProgram | null = null;
    private _attributes: Map<string, number> = new Map();
    private _uniforms: Map<string, WebGLUniformLocation> = new Map();
    /**
     * Gets the name of the shader.
     * @returns string
     */
    public get name(): string {
        return this._name;
    }
    /**
     * Class constructor.
     * @param  {string} name
     */
    constructor(name: string) {
        this._name = name;
        
    }
    /**
     * Destroys the shader.
     * @returns void
     */
    public destroy(): void {
        
    }
    /**
     * Gets the attribute location of the shader.
     * @param  {string} name
     * @returns number
     */
    public getAttribLocation(name: string): number {
        if (this._attributes.get(name) === undefined) {
            log(LogLevel.error, `Attribute ${name} could not be found.`, ErrorCode.NoName);
        }
        return this._attributes.get(name)!;
    }
    /**
     * Gets the uniform location of the shader.
     * @param  {string} name
     * @returns WebGLUniformLocation
     */
    public getUniformLocation(name: string): WebGLUniformLocation {
        if (this._uniforms.get(name) === undefined) {
            log(LogLevel.error, `Attribute ${name} could not be found.`, ErrorCode.NoName);
        }
        return this._uniforms.get(name)!;
    }
    /**
     * Uses this shader in the program.
     * @returns void
     */
    public use(): void {
        GLUtility.gl.useProgram(this._program);
    }
    /**
     * Loads the vertex and fragment sources given.
     * @param  {string} vertexSource
     * @param  {string} fragmentSource
     * @returns void
     */
    protected load(vertexSource: string, fragmentSource: string): void {
        let vertexShader = this.loadShader(vertexSource, GLUtility.gl.VERTEX_SHADER);
        let fragmentShader = this.loadShader(fragmentSource, GLUtility.gl.FRAGMENT_SHADER);
        this.createProgram(vertexShader, fragmentShader);
        this.detectAttributes();
        this.detectUniforms();
    }
    /**
     * Loads the shader from source and by the type.
     * @param  {string} source
     * @param  {number} type WebGL constant (VERTEX_SHADER or FRAGMENT_SHADER)
     * @returns WebGLShader
     */
    private loadShader(source: string, type: number): WebGLShader {
        let shader: WebGLShader | null = GLUtility.gl.createShader(type);
        if (!shader) {
            log(LogLevel.error, `Could not load shader ${type}`, ErrorCode.ShaderType);
        }
        GLUtility.gl.shaderSource(shader!, source);
        GLUtility.gl.compileShader(shader!);
        let error = GLUtility.gl.getShaderInfoLog(shader!)!.trim();
        if (error !== "") {
            log(LogLevel.error, `Could not compile shader ${this._name}: ${error}`, ErrorCode.ShaderLoad);
        }
        return shader!;
    }
    /**
     * Creates a WebGL program using the shaders given.
     * @param  {WebGLShader} vertexShader
     * @param  {WebGLShader} fragmentShader
     * @returns void
     */
    private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
        this._program = GLUtility.gl.createProgram();
        if (this._program === null) {
            log(LogLevel.error, `WebGLProgram could not be created.`, ErrorCode.WebGLProgram);
        }
        GLUtility.gl.attachShader(this._program!, vertexShader);
        GLUtility.gl.attachShader(this._program!, fragmentShader);
        GLUtility.gl.linkProgram(this._program!);
        let error = GLUtility.gl.getProgramInfoLog(this._program!)!.trim();
        if (error !== "") {
            log(LogLevel.error, `WebGLProgram error: ${error}.`, ErrorCode.WebGLProgram);
        }
    }
    /**
     * Detects the attributes in the WebGL shaders.
     * @returns void
     */
    private detectAttributes(): void {
        if (!this._program) {
            log(LogLevel.error, "WebGL program was not created", ErrorCode.WebGLProgram);
        }
        let attribCount: number = GLUtility.gl.getProgramParameter(this._program!, GLUtility.gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attribCount; i++) {
            let attribInfo: WebGLActiveInfo | null = GLUtility.gl.getActiveAttrib(this._program!, i);
            if (!attribInfo) {
                break;
            }
            this._attributes.set(attribInfo.name, GLUtility.gl.getAttribLocation(this._program!, attribInfo.name)!);
        }
    }
    /**
     * Detects the uniforms in the WebGL shaders.
     * @returns void
     */
    private detectUniforms(): void {
        if (!this._program) {
            log(LogLevel.error, "WebGL program was not created", ErrorCode.WebGLProgram);
        }
        let uniformCount: number = GLUtility.gl.getProgramParameter(this._program!, GLUtility.gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            let uniformInfo: WebGLActiveInfo | null = GLUtility.gl.getActiveUniform(this._program!, i);
            if (!uniformInfo) {
                break;
            }
            this._uniforms.set(uniformInfo.name, GLUtility.gl.getUniformLocation(this._program!, uniformInfo.name)!);
        }
    }
}