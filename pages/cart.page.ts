import {Locator,Page,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    //LOCATOR
    readonly locatorCartTitle : Locator
    readonly locatorContinueShoppingButton : Locator
    readonly locatorInventoryItem : Locator
    readonly locatorCheckoutButton : Locator
    readonly locatorInventoryItemName : Locator
    readonly locatorInventoryItemPrice : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorCartTitle = page.getByTestId('title')
        this.locatorContinueShoppingButton = page.getByTestId('continue-shopping')
        this.locatorInventoryItem = page.getByTestId('inventory-item')
        this.locatorCheckoutButton = page.getByTestId('checkout')
        this.locatorInventoryItemName = page.getByTestId('inventory-item-name')
        this.locatorInventoryItemPrice = page.getByTestId('inventory-item-price')

    }

    async expectCartPage(){
        await expect(this.page).toHaveURL(/cart/)
    }

    async deleteAllProducts() {
        while (await this.locatorInventoryItem.count() > 0) {
            await this.page.getByRole('button', {name:'Remove'}).first().click()
            await this.waitFor()
        }
    }

    async expectProductInCart(product){
        const priceText = await this.locatorInventoryItemPrice.innerText(); // Extrait le texte de l'élément
        const priceFloat = parseFloat(priceText.replace('$',''))
        await expect(this.locatorInventoryItemName).toHaveText(product.name)
        await expect(priceFloat).toEqual(product.price)
    }

    async clickContinueShopping(){
        await this.locatorContinueShoppingButton.click()
    }

    async clickCheckoutButton(){
        await this.locatorCheckoutButton.click()
    }
}