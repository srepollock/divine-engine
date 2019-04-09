import { ErrorCode, LogLevel } from ".";
/**
 * Logging system. This is a simple command that takes the log level and prints to the console based on the level. Has 
 * some other general error functionality that can be super useful. Follows some general conventions about different 
 * error levels.
 * 
 * For debugging, the code will check `process.env.NODE_DEBUG` to run or not. Production code should have this set to 
 * false.
 * @param  {LogLevel} level
 * @param  {ErrorCode} ec
 * @param  {string} message
 * @returns string
 */
export function log(level: LogLevel, message: string, ec?: ErrorCode): string {
    if (ec === undefined) ec = ErrorCode.OK;
    var errorString: string = "";
    switch (level) {
        case LogLevel.info:
            errorString = `Info\t${message}`;
            console.log("\t", "\x1b[32m", errorString, "\x1b[0m");
            break;
        case LogLevel.debug:
            if (process.env.NODE_DEBUG === "true") {
                errorString = `Debug\t|| ${ec} ${ErrorCode[ec]}: ${message}`;
                console.log("\t", "\x1b[34m", errorString, "\x1b[0m");
            }
            break;
        case LogLevel.warning:
            errorString = `Warn\t|| ${ec} ${ErrorCode[ec]}: ${message}`;
            console.log("\t", "\x1b[33m", errorString, "\x1b[0m");
            break;
        case LogLevel.error:
            errorString = `Error\t|| ${ec} ${ErrorCode[ec]}: ${message}`;
            console.error("\t", "\x1b[31m", errorString, "\x1b[0m");
            break;
        case LogLevel.critical:
            errorString = `Critical!! || ${ec} ${ErrorCode[ec]}: ${message}`;
            console.error("\t", "\x1b[30m", "\x1b[41m", errorString, "\x1b[0m");
            throw new Error(errorString);
        default:
            throw new Error("Something terrible happened or that logging level is not allowed.");
    }
    return errorString;
}