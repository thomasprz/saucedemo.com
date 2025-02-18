import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    readonly headerCartPage : Locator
    readonly buttonContinueShopping : Locator
    readonly buttonCheckout : Locator
    readonly cartItems : Locator
    readonly buttonRemoveItem : Locator
    readonly shoppingCartLink : Locator
    readonly cartCounter : Locator


    constructor(page:Page) {
        super(page)
        this.headerCartPage = page.getByTestId('title')
        this.buttonContinueShopping = page.getByTestId('continue-shopping')
        this.buttonCheckout = page.getByTestId('checkout')
        this.cartItems = page.getByTestId('inventory-item')
        this.buttonRemoveItem = page.getByRole('button', {name:'Remove'})
        this.shoppingCartLink = page.getByTestId('shopping-cart-link')
        this.cartCounter = page.getByTestId('shopping-cart-badge')
    }

    async expectCartPage(){
        await expect(this.page).toHaveURL('/cart.html')
        await expect(this.headerCartPage).toBeVisible()
    }

    async deleteOneProduct() {
        await this.buttonRemoveItem.click()
    }

    async deleteAllProducts() {
        while (await this.cartItems.count() > 0) {
            const removeButton = this.buttonRemoveItem.first();
            await removeButton.click();
            await this.page.waitForTimeout(500); // Attendre 500 ms pour laisser le temps au DOM de se mettre à jour
        }
    }

    async getCurrentCartCount(){
        const cartBadgeText = await this.cartCounter.innerText();
        return parseInt(cartBadgeText);
    }

    async verifyCartCountDecreasedByOne() {
        const newCount = await this.getCurrentCartCount();
        expect(newCount).toBe(newCount - 1);
    }

}