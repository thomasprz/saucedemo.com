import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';
import { InventoryPage } from './inventory.page';
import { CheckoutCompletePage } from './checkout-complete.page';

export class CheckoutStepTwoPage extends BasePage{

    readonly headerCheckoutOverview : Locator
    readonly inventoryItem : Locator
    readonly productName : Locator
    readonly productPrice : Locator
    readonly productQuantity : Locator
    readonly buttonCancel : Locator
    readonly buttonFinish : Locator

    constructor(page:Page){
        super(page)
        this.headerCheckoutOverview = page.getByTestId('title')
        this.inventoryItem = page.getByTestId('inventory-item')
        this.productName = page.getByTestId('inventory-item-name')
        this.productPrice = page.getByTestId('inventory-item-price')
        this.productQuantity = page.getByTestId('item-quantity')
        this.buttonCancel = page.getByTestId('cancel')
        this.buttonFinish = page.getByTestId('finish')

    }

    async expectCheckoutStepTwo(){
        await expect(this.page).toHaveURL('/checkout-step-two.html')
        await expect(this.headerCheckoutOverview).toBeVisible()
    }

    async expectProducts(products: { name: string; price: number; quantity: string }[]) {
        for (const product of products) {
            await expect(this.productName).toHaveText(product.name);
            await expect(this.productPrice).toHaveText(`$${product.price}`);
            await expect(this.productQuantity).toHaveText(product.quantity);
    }}

     async clickCancel(){
        await this.buttonCancel.click()
        return new InventoryPage(this.page)
    }

    async clickFinish(){
        await this.buttonFinish.click()
        return new CheckoutCompletePage(this.page)
    }
}