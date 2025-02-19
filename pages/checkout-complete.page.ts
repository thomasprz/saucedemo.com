import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';
import { InventoryPage } from './inventory.page';

export class CheckoutCompletePage extends BasePage{
    readonly headerCheckoutComplete : Locator
    readonly buttonBackHome : Locator
    readonly headerCompleteOrder : Locator

    constructor(page:Page){
        super(page)
        this.headerCheckoutComplete = page.getByTestId('title')
        this.buttonBackHome = page.getByTestId('back-to-products')
        this.headerCompleteOrder = page.getByTestId('complete-header')
    }

    async expectCheckoutCompletePage(){
        await expect(this.page).toHaveURL('/checkout-complete.html')
        await expect(this.headerCheckoutComplete).toBeVisible()
    }

    async clickBackHome(){
        await this.buttonBackHome.click()
        return new InventoryPage(this.page)
    }
}