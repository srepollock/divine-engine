
export enum ErrorCode {
    Error = 0, // General error
    EngineInitialization = 100, // Engine begins
    EngineInstanceNull,
    EngineInstanceNotNull,
    EngineWindowUndefined,
    EngineStartedEarly,
    EngineStart,
    EngineRunning,
    EngineStopping,
    EnginePausing,
    MessageSystemInitialization = 200, // MessageSystem
    BrowserWindowUndefined = 300, // BrowserWindow begins
    BrowserWindowDidNotClose,
    EntityInitialization = 400, // Entity begins
    EntityAlreadyHasComponent,
    EntityComponentNotFound
}

export function LogError(ec: ErrorCode, data: string = ""): string {
    const errorString = `Error Code: ${ec} Information: ${data}`;
    console.error(errorString);
    return errorString;
}

export function LogInfo(data: string = ""): string {
    const errorString = `Information: ${data}`;
    console.error(errorString);
    return errorString;
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