
export enum ErrorCode {
    Error = 0, // General error
    WindowUndefined,
    DocumentUndefined,
    EngineInitialization = 100, // Engine begins
    EngineInstanceNull,
    EngineInstanceNotNull,
    EngineClientNotSet,
    EngineWindowUndefined,
    EngineStartedEarly,
    EngineRunning,
    EngineNotRunning,
    MessageSystemInitialization = 200, // MessageSystem
    BrowserWindowUndefined = 300, // BrowserWindow begins
    BrowserWindowDidNotClose,
    EntityInitialization = 400, // Entity begins
    EntityParentUndefined,
    EntityAlreadyHasChild,
    EntityAlreadyHasComponent,
    EntityChildNotFound,
    EntityComponentNotFound
}
/**
 * Logs information to the console.
 * @param  {string} data
 * @returns void
 */
export function Log(data: string): void {
    const information: string = `${data}`;
    console.log(information);
}
/**
 * Error logging to the console. This is when the engine may begin to break or
 * cease running.
 * @param  {ErrorCode} ec
 * @param  {string=""} data
 * @returns string
 */
export function LogError(ec: ErrorCode, data: string = ""): void {
    const errorString = `Error Code: ${ec} Information: ${data}`;
    console.error(errorString);
}
/**
 * Prints infromation to the console for the developer.
 * @param  {string=""} data
 * @returns string
 */
export function LogInfo(data: string = ""): void {
    const errorString = `Information: ${data}`;
    console.info(errorString);
}

/**
 * Prints the information in the debug log when debug has been activated through
 * the engine arguments. This is for extra information from the system on manual
 * functions and tasks. There will be a long console log as everthting will be 
 * printed directly to the console.
 * DEBUG: THis needs to have a boolean to debug mode
 * **Verbose must be on. Only available in Chromium browsers with V8.**
 * @param  {string} data
 * @returns string
 */
export function LogDebug(data: string): void {
    const debugInformation: string = `${data}`;
    console.log(debugInformation);
}

// export interface LogInterface {
//     debug(code: ErrorCode, ...info: any[]): void;
//     warn(code: ErrorCode, ...info: any[]): void;
//     error(code: ErrorCode, ...info: any[]): void;
//     info(code: ErrorCode, ...info: any[]): void;
// }

// export class ErrorSystem implements LogInterface {
//     public debug(ec: ErrorCode, ...info: any[]): string {
//         const errorString = `Error Code: ${ec} Information: ${info}`;
//         console.error(errorString);
//         return errorString;
//     }
//     public warn(ec: ErrorCode, ...info: any[]): string {
//         const errorString = `Error Code: ${ec} Information: ${info}`;
//         console.error(errorString);
//         return errorString;
//     }
//     public error(ec: ErrorCode, ...info: any[]): string {
//         const errorString = `Error Code: ${ec} Information: ${info}`;
//         console.error(errorString);
//         return errorString;
//     }
//     public info(ec: ErrorCode, ...info: any[]): string {
//         const errorString = `Error Code: ${ec} Information: ${info}`;
//         console.error(errorString);
//         return errorString;
//     }
// }