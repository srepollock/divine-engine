import { Client } from "./helper";

export interface Window {
    container: HTMLElement | undefined;
    browserWindow: Electron.BrowserWindow | undefined;
    screen: Electron.Screen | undefined;
    title: string;
    client: Client;
    start(container: HTMLElement): void;
    update(): void;
    refresh(): void;
    resize(height: number, width: number): void;
    close(): void;
    shutdown(): void;
    toString(): string;
}
