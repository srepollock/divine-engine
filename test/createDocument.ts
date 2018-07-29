import { DOMWindow, JSDOM } from "jsdom";

export var document = new JSDOM(``);
export var window = document.window;