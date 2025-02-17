import { BasePage } from "../pages/base.page";
import { HomePage } from "../pages/home.page";
import {test as pagesTest} from '@playwright/test'
import { InventoryPage } from "../pages/inventory.page";

interface Pages{
    base : BasePage
    home : HomePage
    inventory : InventoryPage
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
    }

})