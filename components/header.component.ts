import {Locator,Page,expect} from '@playwright/test'
import { BasePage } from '../pages/base.page';

export class HeaderComponent extends BasePage{
    //LOCATOR
    readonly locatorSwagLabsTitle : Locator
    readonly locatorShoppingCartBadge : Locator
    readonly locatorButtonMenu : Locator
    readonly locatorCartLink : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorSwagLabsTitle = page.getByText('Swag Labs')
        this.locatorShoppingCartBadge = page.getByTestId('shopping-cart-badge')
        this.locatorButtonMenu = page.locator('#bm-burger-button')
        this.locatorCartLink = page.getByTestId('shopping-cart-link')

    }

    async clickShoppingCartLink(){
        await this.locatorCartLink.click()
    }

    async getCurrentCartCount(){
        const cartBadge = await this.locatorShoppingCartBadge.innerText()
        return parseInt(cartBadge); 
    }
}