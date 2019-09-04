import { ErrorCode, log, LogLevel } from "../core/loggingsystem/src";

export class GLUtility {
    public static gl: WebGLRenderingContext;
    private static _instance: GLUtility;
    public canvas: HTMLCanvasElement;
    public static get instance(): GLUtility {
        return GLUtility._instance;
    }
    private constructor() {
        this.canvas = document.body.appendChild(document.createElement("canvas"));
        if (this.canvas.getContext("experimental-webgl") === undefined || 
            this.canvas.getContext("experimental-webgl") === null) {
            log(LogLevel.error, `Unable to initialize Experimental WebGL.`, ErrorCode.WebGLNotInitialized);
        }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        GLUtility.gl = this.canvas.getContext("experimental-webgl")!;
        GLUtility._instance = this;
    }
    public static initialize(): void {
        new GLUtility();
    }
}