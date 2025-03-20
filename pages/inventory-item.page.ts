import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class InventoryItemPage extends BasePage{
    readonly locatorAddToCartButton : Locator
    readonly locatorRemoveButton : Locator
    readonly locatorBackProducts : Locator

    constructor(page:Page){
        super(page)
        this.locatorAddToCartButton = page.getByTestId('add-to-cart')
        this.locatorRemoveButton = page.getByTestId('remove')
        this.locatorBackProducts = page.getByTestId('back-to-products')
    }

    async expectInventoryItemPage(){
        await expect(this.page).toHaveURL(/inventory-item/)
    }

    async addProductToCart(){
        await this.locatorAddToCartButton.click()
    }

    async removeProduct(){
        await this.locatorRemoveButton.click()
    }

    async clickBackToProducts(){
        await this.locatorBackProducts.click()
    }
}