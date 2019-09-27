let timeout = 5000;

describe('Engine Functional Tests on Puppeteer', () => {
    beforeAll(async () => {
        // let index = path.resolve('../../assets/index.html');
        let index = path.resolve("/Users/Spencer/Documents/git/divine-engine/test/assets/index.html");
        await page.goto(`file://${index}`, {waitUntil: "docmcontentloaded"});
    }, timeout);
    it('should be titled "Divine Engine on Puppeteer"', async () => {
        await expect(page.title()).resolves.toMatch("Divine Engine on Puppeteer");
    }, timeout);
});