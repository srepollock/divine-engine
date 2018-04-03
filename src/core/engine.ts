import { ErrorCode, LogError } from "./logging";

export class Engine {
    public static start():void {
        LogError(ErrorCode.EngineInitialization);
    }
}