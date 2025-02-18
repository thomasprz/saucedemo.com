import { BasePage } from "../pages/base.page";
import { HomePage } from "../pages/home.page";
import {test as pagesTest} from '@playwright/test'
import { InventoryPage } from "../pages/inventory.page";
import { InventoryItemPage } from "../pages/inventory-item.page";
import { CartPage } from "../pages/cart.page";

interface Pages{
    base : BasePage
    home : HomePage
    inventory : InventoryPage
    inventoryitem : InventoryItemPage
    cart : CartPage
}

export const pages = pagesTest.extend<Pages>({
    base : async ({page}, use) => {
        await use(new BasePage(page))
    },
    home : async ({page}, use) => {
        await use(new HomePage(page))
    },
    inventory: async ({page}, use) => {
        await use(new InventoryPage(page))
    },
    inventoryitem : async ({page}, use) => {
        await use(new InventoryItemPage(page))
    },
    cart : async ({page}, use) => {
        await use (new CartPage(page))
    },
})