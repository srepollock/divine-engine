'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class EngineConfiguration {
    constructor(_height, _width) {
        this._height = _height;
        this._width = _width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }
}

(function (ErrorCode) {
    ErrorCode[ErrorCode["Error"] = 0] = "Error";
    ErrorCode[ErrorCode["EngineInitialization"] = 100] = "EngineInitialization";
    ErrorCode[ErrorCode["EngineWindowUndefined"] = 101] = "EngineWindowUndefined";
    ErrorCode[ErrorCode["EngineStartedEarly"] = 102] = "EngineStartedEarly";
    ErrorCode[ErrorCode["EngineRunning"] = 103] = "EngineRunning";
    ErrorCode[ErrorCode["EngineStopping"] = 104] = "EngineStopping";
    ErrorCode[ErrorCode["EnginePausing"] = 105] = "EnginePausing";
})(exports.ErrorCode || (exports.ErrorCode = {}));
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

class EngineArguments {
    constructor(height = 0, width = 0) {
        this.height = height;
        this.width = width;
        this.height = height;
        this.width = width;
    }
}
class Engine {
    constructor(args) {
        this.started = false;
        this.exit = false;
        this._height = 0;
        this._width = 0;
        this._window = undefined;
        this._height = args.height;
        this._width = args.width;
    }
    get getStarted() {
        return this.started;
    }
    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    get window() {
        if (this._window) return this._window;
        LogError(exports.ErrorCode.EngineWindowUndefined, "The engine's game window is not defined");
        return undefined;
    }
    start() {
        this.started = true;
        if (!this._window) LogError(exports.ErrorCode.EngineWindowUndefined, "The engine's game window is not defined");
    }
    update() {}
    stop() {
        this.exit = true;
    }
    resize(height, width) {
        if (this._window) {
            this._height = height;
            this._width = width;
            this._window.resize(this._height, this._width);
        } else {
            LogError(exports.ErrorCode.EngineWindowUndefined, "The engine's game window is not defined");
        }
    }
}

class GameWindow {
    constructor(title = "", _height = 0, _width = 0) {
        this.title = title;
        this._height = _height;
        this._width = _width;
        this.title = title;
        this._height = _height;
        this._width = _width;
    }
    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    resize(height, width) {
        this._height = height;
        this._width = width;
    }
}

class DObject {
    constructor(id = "") {
        this.id = id;
        this.id = id;
    }
}

class Transform {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.x = x;
        this.y = y;
    }
}
class Entity extends DObject {
    constructor(id = "", transform = new Transform(), children = new Array(), components = new Array()) {
        super(id);
        this.transform = transform;
        this.children = children;
        this.components = components;
        this.transform = transform;
        this.children = children;
        this.components = components;
    }
    addComponents(...components) {
        for (let comp of components) {
            this.components.push(comp);
        }
    }
    hasComponent(type) {
        let comp = this.components.find(comp => comp.id === type);
        if (comp !== undefined) return true;else return false;
    }
}

class FlagComponent {
    constructor(location = new Transform()) {
        this.location = location;
        this.id = "FlagComponent";
        this.flagnumber = ++FlagComponent.s_flagnumber;
        this.location = location;
    }
    getFlagnumber() {
        return this.flagnumber;
    }
}
FlagComponent.s_flagnumber = 0;

exports.Engine = Engine;
exports.EngineArguments = EngineArguments;
exports.GameWindow = GameWindow;
exports.DObject = DObject;
exports.Entity = Entity;
exports.Transform = Transform;
exports.EngineConfiguration = EngineConfiguration;
exports.LogError = LogError;
exports.LogInfo = LogInfo;
exports.FlagComponent = FlagComponent;
