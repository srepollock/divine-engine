/**
 * 
 * NOTE: Initialize must be a static method/function.
 */
export interface System {
    cleanup(): void;
    shutdown(): void;
    start(): void;
    stop(): void;
    update(delta: number): void;
}