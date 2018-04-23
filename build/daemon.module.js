var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Error"] = 0] = "Error";
    ErrorCode[ErrorCode["EngineInitialization"] = 100] = "EngineInitialization";
    ErrorCode[ErrorCode["EngineWindowUndefined"] = 101] = "EngineWindowUndefined";
    ErrorCode[ErrorCode["EngineStartedEarly"] = 102] = "EngineStartedEarly";
    ErrorCode[ErrorCode["EngineRunning"] = 103] = "EngineRunning";
    ErrorCode[ErrorCode["EngineStopping"] = 104] = "EngineStopping";
    ErrorCode[ErrorCode["EnginePausing"] = 105] = "EnginePausing";
    ErrorCode[ErrorCode["BrowserWindowUndefined"] = 200] = "BrowserWindowUndefined";
    ErrorCode[ErrorCode["BrowserWindowDidNotClose"] = 201] = "BrowserWindowDidNotClose";
})(ErrorCode || (ErrorCode = {}));
/**
 * @param  {ErrorCode} ec
 * @param  {string} info?
 */
function LogError(ec, info) {
    const errorString = `Error Code:${ec} Information: ${info}`;
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
        this._started = false;
        this._running = false;
        this._exit = false;
        this._height = 0;
        this._width = 0;
        this._window = undefined;
        this._height = args.height;
        this._width = args.width;
    }
    get started() {
        return this._started;
    }
    get running() {
        return this._running;
    }
    get exit() {
        return this._exit;
    }
    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    get window() {
        if (this._window) return this._window;
        LogError(ErrorCode.EngineWindowUndefined, "The engine's game window is not defined");
        return undefined;
    }
    start() {
        this._started = true;
        if (!this._window) {
            LogError(ErrorCode.EngineWindowUndefined, "The engine's game window is not defined");
        }
        this._running = true;
    }
    update() {}
    stop() {
        this._exit = true;
    }
    resize(height, width) {
        if (this._window) {
            this._height = height;
            this._width = width;
            this._window.resize(this._height, this._width);
        } else {
            LogError(ErrorCode.EngineWindowUndefined, "The engine's game window is not defined");
        }
    }
}

class GameWindow {
    constructor(title) {
        let remote = require("electron").remote;
        this._title = title;
        this.browserWindow = remote.getCurrentWindow();
    }
    get height() {
        return this.browserWindow.getContentSize()[1];
    }
    get title() {
        return this._title;
    }
    get width() {
        return this.browserWindow.getContentSize()[0];
    }
    resize(height, width) {
        this.browserWindow.setSize(width, height);
    }
    close() {
        this.browserWindow.close();
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

export { Engine, EngineArguments, GameWindow, DObject, Entity, Transform, ErrorCode, LogError, LogInfo, FlagComponent };
