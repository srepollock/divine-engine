export enum ErrorCode {
    Error = 0, // General error
    EngineInitialization = 100, // Engine begins at EC100
    EngineInstanceNull,
    EngineInstanceNotNull,
    EngineWindowUndefined,
    EngineStartedEarly,
    EngineStart,
    EngineRunning,
    EngineStopping,
    EnginePausing,
    BrowserWindowUndefined = 200, // BrowserWindow begins at EC200
    BrowserWindowDidNotClose,
    EntityInitialization = 300, // Entity begins at EC300
    EntityAlreadyHasComponent,
    EntityComponentNotFound
}
/**
 * @param  {ErrorCode} ec
 * @param  {string} info?
 */
export function LogError(ec: ErrorCode, info?: string): string {
    const errorString = `Error Code: ${ec} Information: ${info}`;
    console.error(errorString);
    return errorString;
}
/**
 * @param  {string} info
 */
export function LogInfo(info: string): string {
    console.log(`Information: ${info}`);
    return info;
}