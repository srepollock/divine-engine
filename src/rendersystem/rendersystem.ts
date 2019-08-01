import { GameWindow } from "../core";
import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";
import { System } from "../core/system";
import { RenderStream } from "../core/systemstreams";
import { Color } from "../helper";
import { Matrix3, Matrix4 } from "../math";
import { Camera } from "./camera";
import { DScene } from "./dscene";
import { fragmentShaderSource } from "./fragmentshader";
import { SceneManager } from "./scenemanager";
import { vertexShaderSource } from "./vertexshader";
export class RenderSystem extends System {
    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    /**
     * Gets the canvas' height.
     * @returns number
     */
    public get height(): number {
        return this._canvas.height;
    }
    public get running(): boolean {
        return this._running;
    }
    /**
     * Gets the canvas' width.
     * @returns number
     */
    public get width(): number {
        return this._canvas.width;
    }
    /**
     * Gets the render systems instance for Engine use.
     * @returns RenderSystem
     */
    public static get instance(): RenderSystem {
        return RenderSystem._instance;
    }
    private static _instance: RenderSystem;
    private _buffers: {position: WebGLBuffer | null};
    private _canvas: HTMLCanvasElement;
    private _camera: Camera;
    private _gl: WebGLRenderingContext | null;
    private _programInfo: any;
    private _running: boolean;
    private _sceneManager: SceneManager;
    private _shaderProgram: WebGLProgram | null;
    /**
     * Render system constructor.
     * @param  {number} width
     * @param  {number} height
     */
    private constructor({ width, height, scenes }: {
        width?: number, 
        height?: number,
        scenes?: Array<DScene>,
    } = {}) {
        super("rendersystem");
        if (scenes !== undefined) {
            this._sceneManager = new SceneManager(scenes);
        } else {
            this._sceneManager = new SceneManager();
            this._sceneManager.createEmptyScene();
        }
        if (width === undefined || height === undefined) {
            width = window.innerWidth;
            height = window.innerHeight;
        }
        // TODO: FieldOfView
        this._camera = new Camera();
        // this._camera.transform.z = 5; // REVIEW: This needs to update the transform and the matrix??
        this._camera.projectionMatrix.translate(0, 0, 5);
        this._canvas = document.body.appendChild(this.createCanvasElement(width, height));
        this._gl = this._canvas.getContext("experimental-webgl");
        if (this._gl === null) {
            // tslint:disable-next-line: max-line-length
            log(LogLevel.critical, `Unable to initialize WebGL. Your browser or machine may not support it.`, ErrorCode.CanvasGLContextNull);
        }
        this._buffers = {position: null};
        this._shaderProgram = null;
        this.setupGL(this._gl!);
        this._running = true;
        RenderSystem._instance = this; // NOTE: Render System has been created.
    }
    /**
     * Initializes the system.
     * @returns void
     */
    public static initialize({ width, height, scenes }: {
        width?: number, 
        height?: number,
        scenes?: Array<DScene>,
    } = {}): void {
        new RenderSystem({width, height, scenes});
    }
    /**
     * @returns void
     * @override
     */
    public cleanup(): void {
        RenderSystem.instance._sceneManager.shutdown();
    }
    /**
     * Called when the RenderSystem needs to cleanup and shutdown.
     * @returns void
     */
    public shutdown(): void {
        RenderSystem.instance.cleanup();
    }
    /**
     * RenderSystem start method.
     * @returns void
     */
    public start(): void {
        RenderSystem.instance._running = true;
    }
    /**
     * RenderSystem stop method. Called to stop updating, but continue running (could start later).
     * @returns void
     */
    public stop(): void {
        RenderSystem.instance._running = false;
    }
    /**
     * Renders the scene in the scene manager.
     * @param {DScene} scene Scene to render
     * @returns void
     */
    public render(camera: Camera, scene: DScene): void {
        this.preRender(this._gl!);
        // TODO: Do something with the scene rendering here.
        this.drawScene(this._gl!, this._programInfo, this._buffers!);
    }
    /**
     * The RenderSystem update method. Called from within the engine. This should be called through the 
     * message system however.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        if (RenderSystem.instance._running) {
            /**
             * // TODO: Call this through the message system.
             * // REVIEW: Update this and other systems.
             * RenderStream.on("data", (data as Message) => {
             *   if (data.messageType == MessageType.Render) {
             *     // Render it out.
             *   }
             * });
             */
            log(LogLevel.info, `Renderer delta: ${delta}`);
            // tslint:disable-next-line: max-line-length
            RenderSystem._instance.render(RenderSystem._instance._camera, RenderSystem._instance._sceneManager.scene);
        }
    }
    /**
     * Creates the canvas element for the DOM.
     * @param  {number} width
     * @param  {number} height
     * @returns HTMLCanvasElement
     */
    private createCanvasElement(width: number, height: number, id: string = "deGLCanvas"): HTMLCanvasElement {
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.id = id;
        return canvas;
    }
    /**
     * Draws the scene to the canvas based on the rendering context, shader program info and buffers.
     * @param  {WebGLRenderingContext} gl
     * @param  {any} programInfo
     * @param  {{position:WebGLBuffer|null}} buffers
     * @returns void
     */
    private drawScene(gl: WebGLRenderingContext, programInfo: any, buffers: {position: WebGLBuffer | null}): void {
        let projectionMatrix: Matrix4 = this._camera.projectionMatrix;
        let modelViewMatrix: Matrix4 = new Matrix4();
        modelViewMatrix.translate(-0.0, 0.0, -0.6);
        {
            let numComponents = 2;
            let type = gl.FLOAT;
            let normalize = false;
            let stride = 0;
            let offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(
                this._programInfo.attributeLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(this._programInfo.attributeLocations.vertexPosition);
        }
        gl.useProgram(this._programInfo.program);
        gl.uniformMatrix4fv(this._programInfo.unifromLocations.projectionMatrix, false, projectionMatrix.matrix);
        gl.uniformMatrix4fv(this._programInfo.unifromLocations.modelViewMatrix, false, modelViewMatrix.matrix);
        {
            let offset = 0;
            let vertexCount = 4;
            gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount); // draws the square
        }
    }
    /**
     * Setups the rendering buffers for the GL Context. 
     * 
     * // NOTE: This is a single WebGLBuffer for a single object at this time.
     * // REVIEW: This needs to be a larger array depending on how many Entities are in the scene.
     * @param  {WebGLRenderingContext} gl
     * @returns WebGLBuffer
     */
    private initializeBuffers(gl: WebGLRenderingContext): {position: WebGLBuffer | null} {
        let positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        let positions = [
            -1.0, 1.0,
            1.0, 1.0,
            -1.0, -1.0,
            1.0, -1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        return {
            position: positionBuffer,
        };
    }
    /**
     * Initializes the shader program, so WebGL knows how to draw our data to the WebGL Program.
     * @param  {WebGLRenderingContext} gl
     * @param  {string} vertexShaderSource
     * @param  {string} fragmentShaderSource
     * @returns WebGLProgram
     */
    private initializeShaderProgram(gl: WebGLRenderingContext, vertexShaderSource: string, 
        fragmentShaderSource: string): WebGLProgram | null {
        let vertexShader: WebGLShader | null = this.loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        if (vertexShader === null) {
            log(LogLevel.critical, `The Vertex Shader was not created.`, ErrorCode.WebGLVertexShaderNull);
        }
        let fragmentShader: WebGLShader | null = this.loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (fragmentShader === null) {
            log(LogLevel.critical, `The Fragment Shader was not created.`, ErrorCode.WebGLFragmentShaderNull);
        }
        let shaderProgram = gl.createProgram();
        if (shaderProgram === null) {
            log(LogLevel.critical, `WebGL shader program could not be created.`, ErrorCode.WebGLShaderProgramNull);
        }
        gl.attachShader(shaderProgram!, vertexShader!);
        gl.attachShader(shaderProgram!, fragmentShader!);
        gl.linkProgram(shaderProgram!);
        if (!gl.getProgramParameter(shaderProgram!, gl.LINK_STATUS)) {
            log(LogLevel.critical, `Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram!)}`);
            return null;
        }
        return shaderProgram!;
    }
    /**
     * Creates and compiles the shader as follows:
     * 1. A new shader is created calling gl.createShader()
     * 2. Shader's source code is sent to the shader calling gl.shaderSource()
     * 3. After the shader has the source, it's compiled using gl.compileShader()
     * 4. Checks if the shader was compiled using gl.COMPILE_STATUS; retrieved using gl.getShaderParameter() specificng the shader we wish to check. It prints compiling errors with gl.getShaderInfoLog() then deletes the failed shader.
     * 5. Returns the successful shader back to the program.
     * @param  {WebGLRenderingContext} gl
     * @param  {number} type
     * @param  {string} source
     * @returns WebGLShader
     */
    private loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
        let shader = gl.createShader(type);
        if (shader === null) {
            log(LogLevel.critical, `The shader ${type} (see GL numbered constants) could not be compiled from source.`, 
                ErrorCode.WebGLShaderNull);
        }
        gl.shaderSource(shader!, source);
        gl.compileShader(shader!);
        if (!gl.getShaderParameter(shader!, gl.COMPILE_STATUS)) {
            log(LogLevel.error, `An error occured compiling the shaders: ${gl.getShaderInfoLog(shader!)}`, 
                ErrorCode.WebGLShaderNotCompiled);
            gl.deleteShader(shader!);
            return null;
        }
        return shader!;
    }
    /**
     * Clears the screen before beginning the render.
     * @param  {WebGLRenderingContext} gl
     * @returns void
     */
    private preRender(gl: WebGLRenderingContext): void {
        gl.clearColor(Color.BLACK.r, Color.BLACK.g, Color.BLACK.b, Color.BLACK.a);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    /**
     * Setups the GL to the correct settings to begin rendering.
     * @returns void
     */
    private setupGL(gl: WebGLRenderingContext, backgroundColor: Color = new Color()): void {
        gl.clearColor(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);
        gl.clear(gl.COLOR_BUFFER_BIT);
        this._shaderProgram = this.initializeShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
        this._programInfo = {
            program: this._shaderProgram!,
            attributeLocations: {
                vertexPosition: gl.getAttribLocation(this._shaderProgram!, "aVertexPosition"),
            },
            unifromLocations: {
                projectionMatrix: gl.getUniformLocation(this._shaderProgram!, "uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(this._shaderProgram!, "uModelViewMatrix"),
            },
        };
        this._buffers = this.initializeBuffers(gl);
    }
}
