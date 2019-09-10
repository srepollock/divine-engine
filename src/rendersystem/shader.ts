import { ErrorCode, log, LogLevel } from "de-loggingsystem";
import { GLUtility } from "./glutility";

export abstract class Shader {
    private _name: string;
    private _program: WebGLProgram | null = null;
    private _attributes: Map<string, number> = new Map();
    private _uniforms: Map<string, WebGLUniformLocation> = new Map();
    public get name(): string {
        return this._name;
    }
    constructor(name: string) {
        this._name = name;
        
    }
    public destroy(): void {
        
    }
    public getAttribLocation(name: string): number {
        if (this._attributes.get(name) === undefined) {
            log(LogLevel.error, `Attribute ${name} could not be found.`, ErrorCode.NoName);
        }
        return this._attributes.get(name)!;
    }
    public getUniformLocation(name: string): WebGLUniformLocation {
        if (this._uniforms.get(name) === undefined) {
            log(LogLevel.error, `Attribute ${name} could not be found.`, ErrorCode.NoName);
        }
        return this._uniforms.get(name)!;
    }
    public use(): void {
        GLUtility.gl.useProgram(this._program);
    }
    protected load(vertexSource: string, fragmentSource: string): void {
        let vertexShader = this.loadShader(vertexSource, GLUtility.gl.VERTEX_SHADER);
        let fragmentShader = this.loadShader(fragmentSource, GLUtility.gl.FRAGMENT_SHADER);
        this.createProgram(vertexShader, fragmentShader);
        this.detectAttributes();
        this.detectUniforms();
    }
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