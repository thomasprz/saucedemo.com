import {test as pagesTest} from '@playwright/test'
import { HomePage } from "../pages/home.page";
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutStepOnePage } from '../pages/checkout-step-one.page';
import { CheckoutStepTwoPage } from '../pages/checkout-step-two.page';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';

interface Pages{
    home : HomePage
    inventory : InventoryPage
    cart : CartPage
    checkout: {
        one: CheckoutStepOnePage;
        two: CheckoutStepTwoPage;
        complete: CheckoutCompletePage;
    };
}

export const pages = pagesTest.extend<Pages>({
    
    home: async ({page}, use) => {
        await use(new HomePage(page))
    },
    inventory: async ({page}, use) => {
        await use(new InventoryPage(page))
    },
    cart: async ({page}, use) => {
        await use(new CartPage(page))
    },
    checkout: async ({ page }, use) => {
        const checkout = {
            one: new CheckoutStepOnePage(page),
            two: new CheckoutStepTwoPage(page),
            complete: new CheckoutCompletePage(page),
        };
        await use(checkout);
    },
})

