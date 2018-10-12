import * as fs from "fs";
import { Scene } from "./scene";

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
 * Client that the engine is running on.
 */
export enum Client {
    Console, // Mocha tests
    Browser, // Web/Mobile
    Electron // Desktop
}
/**
 * Loads a JSON file and returns it as a string.
 * @param  {string} filename
 * @returns string
 */
export function readJSONFile(filename: string): string {
    return fs.readFileSync(filename, "utf8");
}
/**
 * Loads a JSON file and returns it as a string
 * @param  {string} filename
 * @returns Scene
 */
export function readJSONFileAsScene(filename: string): Scene {
    return Object.assign(new Scene(), readJSONFile(filename));
}
/**
 * Writes data to a file.
 * NOTE: Best to write a JSON string for easy fileparsing.
 * @param  {string} filename
 * @param  {string} data
 * @returns void
 */
export function writeJSONFile(filename: string, data: string): void {
    fs.writeFileSync(filename, data);
}