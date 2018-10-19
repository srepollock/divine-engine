
export enum ErrorCode {
    OK = 0,
    EngineFailed = 1,
    Error, // General Errors
    DocumentUndefined,
    EngineInitialization = 100, // Engine Errors
    EngineInstanceNull,
    EngineInstanceNotNull,
    EngineClientNotSet,
    EngineWindowUndefined,
    EngineStartedEarly,
    EngineRunning,
    EngineNotRunning,
    MessageSystemInitialization = 200, // MessageSystem Errors
    BrowserWindowUndefined = 300, // BrowserWindow Errors
    BrowserWindowDidNotClose,
    SceneUndefined = 400, // Scene Errors
    SceneNameUndefined,
    SceneManagerUndefined,
    EntityInitialization = 500, // Entity Errors
    EntityParentUndefined,
    EntityAlreadyHasChild,
    EntityAlreadyHasComponent,
    EntityChildNotFound,
    EntityComponentNotFound,
    WindowUndefined, // Window Errors
    GameWindowUndefined,
    ErrorLoadingFile, // Helper Function Errors
    ReadJSONFile,
    WriteJSONFile,
    FileContentsNotRead,
}
// NOTE: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
/**
 * Used for logging general information to the console.
 * @param  {string} data 
 * @returns void
 */
export function Log(data: string): void {
    const errorString = `Info || ${data}`;
    console.log("\x1b[32m", errorString, "\x1b[0m");
}
/**
 * Used for logging critical information to the console.
 * Output is in red.
 * @param  {ErrorCode} ec 
 * @param  {string} data
 * @returns void
 */
export function LogCritical(ec: ErrorCode, data: string): void {
    const errorString = `Critical!! || ${ec}:${data}`;
    console.error("\x1b[30m", "\x1b[41m", errorString, "\x1b[0m");
}
/**
 * Prints Debug infomration to the log. This should be used for debugging purposes.
 * REVIEW: In the future, perhpas this should use a NodeJS environment variable?
 * @param  {string} data
 * @returns string
 */
export function LogDebug(data: string): void {
    const debugInformation: string = `Debug || ${data}`;
    console.log("\x1b[37m", "\x1b[44m", debugInformation, "\x1b[0m");
}
/**
 * Error logging to the console. This is when the engine may begin to break or
 * cease running.
 * @param  {ErrorCode} ec
 * @param  {string=""} data
 * @returns string
 */
export function LogError(ec: ErrorCode, data: string = ""): void {
    const errorString = `Error || ${ec}:${data}`;
    console.error("\x1b[31m", errorString, "\x1b[0m");
}
/**
 * Warning message to the console. When something could start to go wrong
 * @param  {ErrorCode} ec
 * @param  {string} data
 * @returns void
 */
export function LogWarning(ec: ErrorCode, data: string): void {
    const errorString = `Warning! || ${ec}:${data}`;
    console.log("\x1b[40m", "\x1b[33m", errorString, "\x1b[0m");
}