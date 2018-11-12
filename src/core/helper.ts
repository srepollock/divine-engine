/**
 * Client that the engine is running on.
 */
export enum Client {
    Console, // Mocha tests
    Browser, // Web/Mobile
    Electron // Desktop
}
/**
 * Key Codes for keyboard input.
 */
export enum KeyCode {
    A,
    B,
    C,
}
export class Point {
    constructor(public x: number = 0, public y: number = 0) {

    }
}
/**
 * Unique message ID.
 */
export function guid(): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
            }  
    return `${s4() + s4()}-${s4() + s4()}-${s4() + s4()}-${s4() + s4()}`;
}
/**
 * Gets the filename from the filepath given.
 * @param  {string} filepath
 * @returns string
 */
export function filenameFromPath(filepath: string): string {
    return filepath.substr(filepath.lastIndexOf("/") + 1).split(".")[0];
}