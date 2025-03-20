import { Page, expect } from '@playwright/test';
import path from 'path';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo(url){
        await this.page.goto(url);
    }

    async waitFor() {
        await this.page.waitForTimeout(500);
    }

    async screenshot(screenshotName){
        await this.page.screenshot({
            path: `./tests/tests_visual/screenshots/${screenshotName}.png`,
            fullPage: true,
        });
    }

    async expectScreenshot(screenshotName){
        await expect.soft(this.page).toHaveScreenshot(`${screenshotName}.png`, { fullPage: true });
  }
}
