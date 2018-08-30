import { fail } from "assert";
import { expect } from "chai";
import fs from "fs";
import puppeteer from "puppeteer";
import { Browser, Page } from "puppeteer";
import * as Divine from "../../lib/divine.es";

describe("Chrome testing", () => {
    var browser: Browser;
    var page: Page;
    let constBrowser: Browser = browser;

    // Puppeteer options
    const opts = {
        devtools: true,
        headless: false,
        slowMo: 100,
        timeout: 10000
    };
    // NOTE: Timeout for mocha is capped at 2000ms. This much be overridden with .timeout(n) after the arrow function
    // expose variables
    before (async () => {
        browser = await puppeteer.launch(opts);
        let content: string = fs.readFileSync(__dirname + "/../helperfiles/testPage.html", "utf-8");
        page = await browser.newPage();
        await page.goto(`data:text/html,` + content, { waitUntil: "networkidle2" });
        // await page.setContent(content); // BUG: Not waiting for the page content to be loaded
    });
    
    it("should be started and running", async () => {
        await page.on("console", (msg) => {
            expect(msg.text()).equals("Engine started");
        });
    });

    // close browser and reset global variables
    after (() => {
        browser.close();
        browser = constBrowser;
    });
});