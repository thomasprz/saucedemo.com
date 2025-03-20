import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from '../pages/base.page';

export class SidebarComponent extends BasePage{
    //LOCATOR
    readonly locatorBurgerButton : Locator
    readonly locatorBurgerCloseButton : Locator
    readonly locatorAllItemsLink : Locator
    readonly locatorAboutLink : Locator
    readonly locatorLogoutLink : Locator
    readonly locatorResetAppStateLink : Locator
    readonly locatorMenuContainer : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorBurgerButton = page.locator('#react-burger-menu-btn')
        this.locatorBurgerCloseButton = page.locator('#react-burger-cross-btn')
        this.locatorAllItemsLink = page.getByRole('link', {name:'All Items'})
        this.locatorAboutLink = page.getByRole('link', {name:'About'})
        this.locatorLogoutLink = page.getByRole('link', {name:'Logout'})
        this.locatorResetAppStateLink = page.getByRole('link', {name:'Reset App State'})
        this.locatorMenuContainer = page.locator('.bm-menu-wrap')
    }

    async openMenu(){
        await this.locatorBurgerButton.click()
    }

    async closeMenu(){
        await this.locatorBurgerCloseButton.click()
    }

    async clickAllItems(){
        await this.locatorAllItemsLink.click()
    }

    async clickAbout(){
        await this.locatorAboutLink.click()
    }
    
    async clickLogout(){
        await this.locatorLogoutLink.click()
    }

    async clickResetAppState(){
        await this.locatorResetAppStateLink.click()
    }
}