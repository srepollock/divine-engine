var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Error"] = 0] = "Error";
    ErrorCode[ErrorCode["EngineInitialization"] = 100] = "EngineInitialization";
    ErrorCode[ErrorCode["EnginePreviouslyInitialized"] = 101] = "EnginePreviouslyInitialized";
    ErrorCode[ErrorCode["EngineStartedEarly"] = 102] = "EngineStartedEarly";
    ErrorCode[ErrorCode["EngineRunning"] = 103] = "EngineRunning";
    ErrorCode[ErrorCode["EngineStopping"] = 104] = "EngineStopping";
    ErrorCode[ErrorCode["EnginePausing"] = 105] = "EnginePausing";
})(ErrorCode || (ErrorCode = {}));
/**
 * @param  {ErrorCode} ec
 * @param  {string} info?
 */
function LogError(ec, info) {
    var errorString = `Error Code:${ec} Information: ${info}`;
    console.error(errorString);
    return errorString;
}
/**
 * @param  {string} info
 */
function LogInfo(info) {
    console.log(`Information: ${info}`);
    return info;
}

class Engine {
    //#endregion
    constructor() {
        this.height = 0;
        this.width = 0;
        if (Engine.instance != null) LogError(ErrorCode.EnginePreviouslyInitialized, "engine has already\
                been initialized");
        if (!Engine.started) LogError(ErrorCode.EngineStartedEarly, "engine running prior to \
                constructor initialization");
        Engine.instance = this;
    }
    static start(height, width, ready) {
        this.started = true;
        new Engine();
        Engine.resize(height, width);
        return this.instance;
    }
    static stop() {
        Engine.exit = true;
    }
    static resize(height, width) {
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
Engine.started = false;
Engine.exit = false;

export { Engine, ErrorCode, LogError, LogInfo };
