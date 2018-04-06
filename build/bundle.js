'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

(function (ErrorCode) {
    ErrorCode[ErrorCode["Error"] = 0] = "Error";
    ErrorCode[ErrorCode["EngineInitialization"] = 100] = "EngineInitialization";
    ErrorCode[ErrorCode["EngineRunning"] = 101] = "EngineRunning";
    ErrorCode[ErrorCode["EngineStopping"] = 102] = "EngineStopping";
    ErrorCode[ErrorCode["EnginePausing"] = 103] = "EnginePausing";
})(exports.ErrorCode || (exports.ErrorCode = {}));
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
        LogError(exports.ErrorCode.EngineInitialization);
    }
}

exports.Engine = Engine;
exports.LogError = LogError;
exports.LogInfo = LogInfo;
