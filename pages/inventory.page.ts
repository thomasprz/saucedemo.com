import {Page,Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';
import { InventoryItemPage } from './inventory-item.page';
import { HeaderComponent } from '../components/header.component';


export class InventoryPage extends BasePage {
    //LOCATOR
    readonly locatorProductsTitle : Locator
    readonly locatorProductItemName : Locator
    readonly locatorProductName : Locator
    readonly locatorProductSort : Locator
    readonly locatorAddToCart : Locator
    readonly locatorRemoveCart : Locator
    readonly locatorCartLink : Locator
    //PAGE
    readonly item : InventoryItemPage
    readonly header : HeaderComponent


    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorProductsTitle = page.getByTestId('title')
        this.locatorProductItemName = page.getByTestId('inventory-item-name')
        this.locatorProductName = page.getByTestId('inventory-item').getByTestId('inventory-item-name')
        this.locatorProductSort = page.getByTestId('product-sort-container')
        this.locatorAddToCart = page.getByRole('button', {name: "Add to cart"})
        this.locatorRemoveCart = page.getByRole('button', {name: "Remove"})
        //PAGE
        this.item = new InventoryItemPage(page)
        this.header = new HeaderComponent(page)
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

    async addFirstProductToCart(){
        await this.locatorAddToCart.first().click()
    }

    async addOneProductToCart(product) {
        const productContainer = this.page.getByTestId('inventory-item').filter({ hasText: product})
        const addToCartButton = productContainer.getByRole('button', { name: 'Add to cart' });
        await addToCartButton.click();
    }

    async addProductsToCart(products: { name: string }[]) {
        for (const product of products) {
            const productContainer = await this.page.getByTestId('inventory-item').filter({ hasText: product.name });
            await productContainer.getByRole('button', { name: 'Add to Cart' }).click();
        }
    }

    async removeProduct(product){
        const productContainer = this.page.getByTestId('inventory-item').filter({ hasText: product})
        const addToCartButton = productContainer.getByRole('button', { name: 'Remove' });
        await addToCartButton.click();
    }

    async clickFirstProductTitle(){
        await this.locatorProductName.first().click()
    }

}