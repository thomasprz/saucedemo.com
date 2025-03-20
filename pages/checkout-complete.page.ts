import {Locator,Page,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class CheckoutCompletePage extends BasePage {
    //LOCATOR
    readonly locatorCheckoutCompleteTitle : Locator
    readonly locatorSuccessMessage : Locator
    readonly locatorBackHomeButton : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorCheckoutCompleteTitle = page.getByTestId('title')
        this.locatorSuccessMessage = page.getByTestId('complete-header')
        this.locatorBackHomeButton = page.getByTestId('back-to-products')
    }

    async expectCheckoutCompletePage(){
        await expect(this.page).toHaveURL('checkout-complete.html')
        await expect(this.locatorCheckoutCompleteTitle).toContainText('Checkout: Complete!')
    }

    async clickBackHome(){
        await this.locatorBackHomeButton.click()
    }
}