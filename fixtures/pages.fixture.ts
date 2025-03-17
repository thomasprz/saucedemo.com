import {test as pagesTest} from '@playwright/test'
import { HomePage } from "../pages/home.page";
import { InventoryPage } from '../pages/inventory.page';

interface Pages{
    home : HomePage
    inventory : InventoryPage
}

export const pages = pagesTest.extend<Pages>({
    
    home: async ({page}, use) => {
        await use(new HomePage(page))
    },
    inventory: async ({page}, use) => {
        await use(new InventoryPage(page))
    },
})

