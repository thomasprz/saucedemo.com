import {Locator,Page,expect} from '@playwright/test'

export class BasePage {
    page : Page

    constructor(page:Page){
        this.page = page 
    }

    async goto(url='/'){
        await this.page.goto(url)
    }
}