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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Engine = function () {
    function Engine() {
        _classCallCheck(this, Engine);
    }

    _createClass(Engine, null, [{
        key: "start",
        value: function start() {
            LogError(exports.ErrorCode.EngineInitialization);
        }
    }]);

    return Engine;
}();

exports.Engine = Engine;
exports.LogError = LogError;
exports.LogInfo = LogInfo;
