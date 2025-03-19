import {Locator,Page,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class CheckoutStepTwoPage extends BasePage {
    //LOCATOR
    readonly locatorCancelButton : Locator
    readonly locatorFinishButton : Locator
    readonly locatorCheckoutOverviewTitle : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorCheckoutOverviewTitle = page.getByTestId('title')
        this.locatorCancelButton = page.getByTestId('cancel')
        this.locatorFinishButton = page.getByTestId('finish')
    }

    async expectCheckoutStepTwoPage(){
        await expect(this.page).toHaveURL(/checkout-step-two/)
        await expect(this.locatorCheckoutOverviewTitle).toContainText('Checkout: Overview')
    }

    async clickCancel(){
        await this.locatorCancelButton.click()
    }

    async clickFinish(){
        await this.locatorFinishButton.click()
    }
}