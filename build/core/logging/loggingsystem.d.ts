export declare enum ErrorCode {
    Error = 0,
    EngineInitialization = 100,
    EngineWindowUndefined = 101,
    EngineStartedEarly = 102,
    EngineRunning = 103,
    EngineStopping = 104,
    EnginePausing = 105,
    BrowserWindowUndefined = 200,
    BrowserWindowDidNotClose = 201,
}
/**
 * @param  {ErrorCode} ec
 * @param  {string} info?
 */
export declare function LogError(ec: ErrorCode, info?: string): string;
/**
 * @param  {string} info
 */
export declare function LogInfo(info: string): string;
