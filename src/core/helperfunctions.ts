
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