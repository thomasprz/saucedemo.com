import {Locator,Page,expect} from '@playwright/test'

export class BasePage {
    page : Page

    constructor(page:Page){
        this.page = page 
    }

    async goto(url='/'){
        await this.page.goto(url)
    }

    async closePage(){
        await this.page.close()
    }

      //* Scrolls
  async scrollDown(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  async scrollUp(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }
}