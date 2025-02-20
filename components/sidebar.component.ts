import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from '../pages/base.page'
import { InventoryPage } from '../pages/inventory.page'
import { HomePage } from '../pages/home.page'

export class SidebarComponent extends BasePage {
    readonly burgerButton : Locator
    readonly openMenuButton : Locator
    readonly allItemsLink : Locator
    readonly aboutLink : Locator
    readonly logoutLink : Locator
    readonly resetAppLink : Locator
    readonly closeMenuButton : Locator

    constructor(page:Page){
        super(page)
        this.burgerButton = page.locator('#bm-menu-wrap')
        this.openMenuButton = page.getByRole('button', {name:'Open Menu'})
        this.closeMenuButton = page.getByRole('button', {name:'Close Menu'})
        this.allItemsLink = page.getByTestId('inventory-sidebar-link')
        this.aboutLink = page.getByTestId('about-sidebar-link')
        this.logoutLink = page.getByTestId('logout-sidebar-link')
        this.resetAppLink = page.getByTestId('reset-sidebar-link')
    }

    async openAllItems(){
        await this.allItemsLink.click()
        return new InventoryPage(this.page)
    }

    async openAbout(){
        await this.aboutLink.click()
    }

    async openLogout(){
        await this.logoutLink.click()
        return new HomePage(this.page)
    }

    async clickAppState(){
        await this.resetAppLink.click()
    }

    async openMenu(){
        await this.openMenuButton.click()
    }

    async closeMenu(){
        await this.closeMenuButton.click()
    }

    async expectSauceLabs(){
        await expect(this.page).toHaveURL('https://saucelabs.com/')
    }

}