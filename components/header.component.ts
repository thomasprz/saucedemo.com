import {Locator,Page,expect} from '@playwright/test'
import { BasePage } from '../pages/base.page';

export class HeaderComponent extends BasePage{
    //LOCATOR
    readonly locatorSwagLabsTitle : Locator
    readonly locatorShoppingCart : Locator
    readonly locatorButtonMenu : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorSwagLabsTitle = page.getByText('Swag Labs')
        this.locatorShoppingCart = page.getByTestId('shopping-cart-link')
        this.locatorButtonMenu = page.locator('#bm-burger-button')
    }
}