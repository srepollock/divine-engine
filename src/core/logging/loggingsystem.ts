export enum ErrorCode {
    Error = 0, // General error
    EngineInitialization = 100, // Engine begins at EC100
    EnginePreviouslyInitialized,
    EngineStartedEarly,
    EngineRunning,
    EngineStopping,
    EnginePausing,
}
/**
 * @param  {ErrorCode} ec
 * @param  {string} info?
 */
export function LogError(ec: ErrorCode, info?: string):string {
    var errorString = `Error Code:${ec} Information: ${info}`;
    console.error(errorString);
    return errorString;
}
/**
 * @param  {string} info
 */
export function LogInfo(info: string):string {
    console.log(`Information: ${info}`);
    return info;
}