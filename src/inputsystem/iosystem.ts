import { FileLoader, Texture, TextureLoader } from "three";
import { Engine, GameWindow, IOStream } from "../core";
import { ErrorCode, log, LogLevel } from "../core/loggingsystem";
import { Message, MessageType } from "../core/messagesystem";
import { System } from "../core/system";
import { Vector2 } from "../math";
import { FileType } from "./filetype";

export class IOSystem extends System {
    private static _instance: IOSystem;
    private static _mouseAbsolute: Vector2;
    private static _left: boolean;
    private static _mousePosition: Vector2;
    private static _pressedMap: Map<string, boolean>;
    private static _right: boolean;
    /**
     * Gets the absolute position of the mouse on the client screen.
     * @returns Vector2
     */
    public static get absolute(): Vector2 {
        return IOSystem._mouseAbsolute;
    }
    /**
     * Gets the IOSystem instance.
     * @returns IOSystem
     */
    public static get instance(): IOSystem {
        return IOSystem._instance;
    }
    /**
     * Position relative to the game window.
     * @returns Vector2
     */
    public static get position(): Vector2 {
        return IOSystem._mousePosition;
    }
    /**
     * Constructor for the IOSystem
     */
    private constructor() {
        super("iosystem");
        this.systemStream = new IOStream({messageQueueReference: this.messageQueue});
        // Keyboard Setup
        Engine.instance!.container!.addEventListener("keydown", (e) => {
            IOSystem._pressedMap.set(e.key, true);
            this.sendMessage(JSON.stringify(IOSystem._pressedMap.get(e.key)), MessageType.IO);
        });
        Engine.instance!.container!.addEventListener("keyup", (e) => {
            IOSystem._pressedMap.set(e.key, false);
            this.sendMessage(JSON.stringify(IOSystem._pressedMap.get(e.key)), MessageType.IO);
        });
        // Mouse setup
        IOSystem._mouseAbsolute = new Vector2();
        IOSystem._mousePosition = new Vector2();
        Engine.instance!.container!.addEventListener("mousemove", (e: any) => {
            IOSystem._mouseAbsolute = new Vector2(e.pageX, e.pageY);
            IOSystem.moveGameMouse(IOSystem._mouseAbsolute);
        });
        Engine.instance!.container!.addEventListener("mousedown", (e: any) => {
            if (e.button === 0) {
                IOSystem._left = true;
            } else {
                IOSystem._right = true;
            }
        });
        Engine.instance!.container!.addEventListener("mouseup", (e: any) => {
            if (e.button === 0) {
                IOSystem._left = false;
            } else {
                IOSystem._right = false;
            }
        });
        IOSystem._instance = this;
    }
    /**
     * Initializes the system. This is how the Engine starts and gets a handle of the system.
     * @returns void
     */
    public static initialize(): IOSystem {
        new IOSystem();
        IOSystem._instance.start();
        return IOSystem._instance;
    }
    /**
     * Moves the mouse and sets relative status to the Engine's GameWindow.
     * @param  {Vector2} vec
     * @returns void
     */
    public static moveGameMouse(vec: Vector2): void {
        let screen = Engine.instance!.container!.getBoundingClientRect();
        let screenScale = {width: Engine.instance!.renderSystem.width, height: Engine.instance!.renderSystem.height};
        let scaled = new Vector2(screenScale.width / GameWindow.width, screenScale.height / GameWindow.height);
        // tslint:disable-next-line: max-line-length
        IOSystem._mousePosition = new Vector2((vec.x - screen.left - screenScale.height) / scaled.x, (vec.y - screen.top - screenScale.width) / scaled.y);
    }
    /**
     * Cleans up the system on shutdown.
     * @returns void
     */
    public cleanup(): void {
        this.systemStream.removeAllListeners();
    }
    /**
     * Starts the system.
     * @returns void
     */
    public start(): void {
        this.systemStream.on("data", (data) => {
            this.messageQueue.push(Object.assign(new Message(), JSON.parse(data)));
        });
        log(LogLevel.debug, "IO System started, all system listeners added");
        this.running = true;
    }
    /**
     * Stops the system from playing.
     * @returns void
     */
    public stop(): void {
        this.running = false;
    }
    /**
     * The update function for the system.
     * @param  {number} delta
     * @returns void
     */
    public update(delta: number): void {
        if (this.running) {
            this.messageQueue.forEach((element) => {
                this.onMessage(element);
            });
            this.messageQueue = new Array<Message>();
        }
    }
    public onMessage(message: Message): void {
        log(LogLevel.debug, message.toString());
        let data = JSON.parse(message.data);
        switch (message.type) {
            case (MessageType.IO):
                // REVIEW: handle more than one type of image (png, jpg, etc.) on the enigne?
                if (new RegExp(".*\.(png|jpg)$").test(data.url as string)) {
                    this.loadTexture(data.id, data.url);
                } else {
                    log(LogLevel.error, `The file ${data.url} is not one of the supported image types.`, 
                        ErrorCode.FileTypeNotAcceptable);
                    this.sendMessage(JSON.stringify({id: data.id, texture: new Texture()}), MessageType.Asset);
                }
                break;
            default:
                log(LogLevel.debug, `IOSystem discarded a message`);
                break;
            
        }
    }
    /**
     * Use ThreeJS TextureLoader and it's callback functions create the texture from file and load return it once 
     * completely loaded. Will also give the progress and/or error when loading.
     * @param  {string} texture
     * @returns Texture
     */
    private loadTexture(id: string, url: string): void {
        new TextureLoader().load(url, (texture: any) => {
            this.sendMessage(JSON.stringify({id, texture}), MessageType.Asset);
        }, 
        // tslint:disable-next-line: max-line-length
        undefined, // NOTE: Progress is depricated for TextureLoader; https://threejs.org/docs/index.html#api/en/loaders/TextureLoader
        () => {
            log(LogLevel.error, `Entity: ${this.id} texture: ${url} could not be loaded.`, 
                ErrorCode.TextureNotLoaded);
        });
    }
    // public loadFile(url: string, filetype: FileType): any {
    //     function loaded(data: any): any {
    //         this.sendMessage(new Message(data, MessageType.Asset));
    //     }
    //     function loadingProgression(xhr: any): any {
    //         log(LogLevel.info, `${url} ${(xhr.loaded / xhr.total * 100)} % loaded`);
    //     }
    //     function loadingError(err: any): any {
    //         log(LogLevel.error, `Something happend when loading ${url}. File was not loaded.`, 
    //             ErrorCode.LoadAssetFailed);
    //     }
    //     switch (filetype) {
    //         case FileType.image:
    //             return new FileLoader().load(url, loaded, loadingProgression, loadingError);
    //             break;
    //         case FileType.sound:
                
    //             break;
    //         case FileType.scene:
                
    //             break;
    //         default:
    //             log(LogLevel.error, `FileType ${filetype} is not an acceptable FileType for the engine.`, 
    //                 ErrorCode.FileTypeNotAcceptable);
    //             break;
    //     }
    // }
}