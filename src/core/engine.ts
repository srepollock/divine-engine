import { EngineConfiguration } from "./engineconfiguration";
import { ErrorCode, LogError, LogInfo } from "./logging";

export class Engine {
    //#region Class Variables
    private static instance: Engine;
    private static started: boolean = false;
    private static exit: boolean = false;
    private height: number = 0;
    private width: number = 0;
    //#endregion
    private constructor() {
        if (Engine.instance != null)
            LogError(ErrorCode.EnginePreviouslyInitialized, "engine has already\
                been initialized")
        if (!Engine.started)
            LogError(ErrorCode.EngineStartedEarly, "engine running prior to \
                constructor initialization");
        Engine.instance = this;
    }
    public static start(height:number, width: number, ready:() => void): Engine {
        this.started = true;
        new Engine();

        Engine.resize(height, width);
        return this.instance;
    }
    public static stop(): void {
        Engine.exit = true;
    }
    public static resize(height:number, width:number):void {
        Engine.instance.height = height;
        Engine.instance.width = width;
        // TODO: Resize
        /**
         * if(!Window.resize()) {
         *  LogError(ErrorCode.WindowResizeFailed);
         * }
         */
    }
}

export default Engine;