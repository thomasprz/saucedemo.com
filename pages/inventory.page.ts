import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'
import data from '../assets/data/e2e/inventory.data.json'

export class InventoryPage extends BasePage{
    readonly headerInventory : Locator
    readonly inventoryItemName : Locator
    readonly sortFilter : Locator

    constructor(page:Page){
        super(page)
        this.headerInventory = page.getByTestId('title')
        this.inventoryItemName = page.getByTestId('inventory-item-name')
        this.sortFilter = page.getByTestId('product-sort-container')
    }

    async expectInventoryPage(){
        await expect(this.page).toHaveURL('/inventory.html')
        await expect(this.headerInventory).toBeVisible()
    }

    async sortBy(sort) {
        await this.sortFilter.selectOption(sort);
        const sortedData = data[sort];
        // Vérifier l'ordre des éléments sur la page
        for (let i = 0; i < sortedData.length; i++) {
            const itemName = sortedData[i].name;
            const itemLocator = this.inventoryItemName.nth(i);
            await expect(itemLocator).toHaveText(itemName);
        }
    }
}