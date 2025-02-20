import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'
import data from "../assets/data/e2e/inventory.data.json"
import { CartPage } from './cart.page'

export class InventoryPage extends BasePage{
    readonly headerInventory : Locator
    readonly inventoryItemName : Locator
    readonly inventoryItemPrice : Locator
    readonly sortFilter : Locator
    readonly inventoryItem : Locator
    readonly shoppingCartLink : Locator
    readonly cartCounter : Locator
    readonly buttonAddToCart : Locator
    readonly addProductToCart : Locator

    constructor(page:Page){
        super(page)
        this.headerInventory = page.getByTestId('title')
        this.inventoryItemName = page.getByTestId('inventory-item-name')
        this.inventoryItemPrice = page.getByTestId('inventory-item-price')
        this.sortFilter = page.getByTestId('product-sort-container')
        this.inventoryItem = page.getByTestId('inventory-item')
        this.shoppingCartLink = page.getByTestId('shopping-cart-link')
        this.cartCounter = page.getByTestId('shopping-cart-badge')
        this.addProductToCart = page.getByRole('button', {name:' Add to cart'})
    }

    async expectInventoryPage(){
        await expect(this.page).toHaveURL('/inventory.html')
        await expect(this.headerInventory).toBeVisible()
    }

    async sortByName(sortOption) {
        await this.sortFilter.selectOption(sortOption); // Sélectionne l'option de tri dans le menu déroulant
        const displayedItems = await this.inventoryItemName.allTextContents(); // Récupère tous les noms des articles affichés sur la page sous forme de tableau
        const expectedNames = data[sortOption].map(item => item.name); // Extrait uniquement les noms des objets du tableau de données en fonction de l'option de tri sélectionnée
        expect(displayedItems).toEqual(expectedNames); // Vérifie si les noms affichés sur la page correspondent aux noms attendus selon le tri
    }
    
    async sortByPrice(sortOption) {
        await this.sortFilter.selectOption(sortOption);
        const displayedPrices = await this.inventoryItemPrice.allTextContents();
        const prices = displayedPrices.map(price => parseFloat(price.replace('$', '')));
        const expectedPrices = data[sortOption].map(item => item.price);
        expect(prices).toEqual(expectedPrices);
    }

    async addProductsToCart(products: { name: string }[]) {
        for (const product of products) {
            const productContainer = this.page.locator('.inventory_item', { hasText: product.name });
                const addToCartButton = productContainer.getByRole('button', { name: 'Add to cart' });
                await addToCartButton.click();
        }
    }

    getProductName(productName) {
        return this.page.getByRole('link', { name: productName });
    }

    async deleteOneProduct(){
        await this.inventoryItem.getByRole('button', {name:"Remove"}).click()
    }

    async clickOnItemName(id){
        await this.inventoryItemName.nth(id).click()
    }

    async clickOnCartLink(){
        await this.shoppingCartLink.click()
        return new CartPage(this.page)
    }

    async addOneProductToCart(product) {
        const productContainer = this.page.locator('.inventory_item', { hasText: product });
        const addToCartButton = productContainer.getByRole('button', { name: 'Add to cart' });
        await addToCartButton.click();
    }
}