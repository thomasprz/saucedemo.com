import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';
import { InventoryPage } from './inventory.page';
import { CartPage } from './cart.page';

export class InventoryItemPage extends BasePage {
    readonly buttonBackToProducts : Locator
    readonly buttonAddToCart : Locator
    readonly removeProduct : Locator
    readonly inventoryItemName : Locator
    readonly inventoryItemPrice : Locator
    readonly shoppingCartLink : Locator
    readonly cartCounter : Locator

    constructor(page:Page){
        super(page)
        this.buttonBackToProducts = page.getByTestId('back-to-products')
        this.buttonAddToCart = page.getByTestId('add-to-cart')
        this.removeProduct = page.locator('#remove')
        this.inventoryItemName = page.getByTestId('inventory-item-name')
        this.inventoryItemPrice = page.getByTestId('inventory-item-price')
        this.shoppingCartLink = page.getByTestId('shopping-cart-link')
        this.cartCounter = page.getByTestId('shopping-cart-badge')

    }

    async expectInventoryItem(){
        await expect(this.page).toHaveURL(/inventory-item.html/)
        await expect(this.buttonBackToProducts).toBeVisible()
    }

    async addProductToCart(){
        await this.buttonAddToCart.click()
    }

    async deleteOneProduct(){
        await this.removeProduct.click()
    }

    async backToInventoryPage(){
        await this.buttonBackToProducts.click()
        return new InventoryPage(this.page)
    }

    async clickShoppingCartLink(){
        await this.shoppingCartLink.click()
        return new CartPage(this.page)
    }


}