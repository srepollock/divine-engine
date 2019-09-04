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
            throw new Error(`Unable to initialize Experimental WebGL.`);
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