import {Locator,Page,expect} from '@playwright/test'
import { BasePage } from '../pages/base.page';

export class HeaderComponent extends BasePage{
    //LOCATOR
    readonly locatorSwagLabsTitle : Locator
    readonly locatorShoppingCartBadge : Locator
    readonly locatorButtonMenu : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorSwagLabsTitle = page.getByText('Swag Labs')
        this.locatorShoppingCartBadge = page.getByTestId('shopping-cart-badge')
        this.locatorButtonMenu = page.locator('#bm-burger-button')
    }
}