export enum ErrorCode {
    Error = 0, // General error
    EngineInitialization = 100, // Engine begins at EC100
    EngineRunning,
    EngineStopping,
    EnginePausing,
}
/**
 * @param  {ErrorCode} ec
 * @param  {string} info?
 */
export function LogError(ec: ErrorCode, info?: string):void {
    console.error("${ec} information: ${info}");
}
/**
 * @param  {string} info
 */
export function LogInfo(info: string):void {
    console.log("${info}")
}