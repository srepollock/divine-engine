var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Error"] = 0] = "Error";
    ErrorCode[ErrorCode["EngineInitialization"] = 100] = "EngineInitialization";
    ErrorCode[ErrorCode["EngineRunning"] = 101] = "EngineRunning";
    ErrorCode[ErrorCode["EngineStopping"] = 102] = "EngineStopping";
    ErrorCode[ErrorCode["EnginePausing"] = 103] = "EnginePausing";
})(ErrorCode || (ErrorCode = {}));
/**
 * @param  {ErrorCode} ec
 * @param  {string} info?
 */
function LogError(ec, info) {
    console.error("${ec} information: ${info}");
}
/**
 * @param  {string} info
 */
function LogInfo(info) {
    console.log("${info}");
}

class Engine {
    static start() {
        LogError(ErrorCode.EngineInitialization);
    }
}

export { Engine, ErrorCode, LogError, LogInfo };
