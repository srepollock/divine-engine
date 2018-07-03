
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

export interface LogInterface {
    debug(code: ErrorCode, ...info: any[]): void;
    warn(code: ErrorCode, ...info: any[]): void;
    error(code: ErrorCode, ...info: any[]): void;
    info(code: ErrorCode, ...info: any[]): void;
}

export class ErrorSystem implements LogInterface {
    public debug(ec: ErrorCode, ...info: any[]): string {
        const errorString = `Error Code: ${ec} Information: ${info}`;
        console.error(errorString);
        return errorString;
    }
    public warn(ec: ErrorCode, ...info: any[]): string {
        const errorString = `Error Code: ${ec} Information: ${info}`;
        console.error(errorString);
        return errorString;
    }
    public error(ec: ErrorCode, ...info: any[]): string {
        const errorString = `Error Code: ${ec} Information: ${info}`;
        console.error(errorString);
        return errorString;
    }
    public info(ec: ErrorCode, ...info: any[]): string {
        const errorString = `Error Code: ${ec} Information: ${info}`;
        console.error(errorString);
        return errorString;
    }
}