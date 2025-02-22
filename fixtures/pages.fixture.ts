import { BasePage } from "../pages/base.page";
import { LoginPage } from "../pages/login.page";
import {test as pagesTest} from '@playwright/test'
import { InventoryPage } from "../pages/inventory.page";
import { InventoryItemPage } from "../pages/inventory-item.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";

interface Pages{
    base : BasePage
    login : LoginPage
    inventory : InventoryPage
    inventoryitem : InventoryItemPage
    cart : CartPage
    checkout : CheckoutPage
}

export const pages = pagesTest.extend<Pages>({
    base : async ({page}, use) => {
        await use(new BasePage(page))
    },
    login : async ({page}, use) => {
        await use(new LoginPage(page))
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
    checkout : async({page}, use) => {
        await use(new CheckoutPage(page))
    }
})