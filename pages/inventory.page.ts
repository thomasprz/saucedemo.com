import {Page,Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';


export class InventoryPage extends BasePage {
    //LOCATOR
    readonly locatorProductsTitle : Locator
    readonly locatorProductItemName : Locator
    readonly locatorProductName : Locator
    readonly locatorProductSort : Locator
    readonly locatorAddToCart : Locator
    readonly locatorRemoveCart : Locator


    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorProductsTitle = page.getByTestId('title')
        this.locatorProductItemName = page.getByTestId('.inventory_item_name')
        this.locatorProductName = page.getByTestId('inventory-item').getByTestId('inventory-item-name')
        this.locatorProductSort = page.getByTestId('product-sort-container')
        this.locatorAddToCart = page.getByRole('button', {name: "Add to cart"})
        this.locatorRemoveCart = page.getByRole('button', {name: "Remove"})

    }

    async expectInventoryPage(){
        await expect(this.page).toHaveURL('inventory.html')
    }

    async sortProducts() {
        const products = await this.page.locator('.inventory_item').all();
        const sortedProducts: { name: string; price: number }[] = []; 
    
        for (const product of products) {
            const name = await product.locator('.inventory_item_name').innerText();
            const priceText = await product.locator('.inventory_item_price').innerText();
            const price = parseFloat(priceText.replace('$', '')); // Convertir le prix en nombre
            sortedProducts.push({name,price});
        }
        return sortedProducts;
    }

    async sortBy(filter){
        await this.locatorProductSort.selectOption(filter)
    }

    async addProductToCart(index){
        await this.locatorAddToCart.nth(index).click()
    }

    async removeProduct(index){
        await this.locatorRemoveCart.nth(index).click()
    }

}