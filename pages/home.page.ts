import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'
import { InventoryPage } from './inventory.page'

export class HomePage extends BasePage{
    readonly usernameInput : Locator
    readonly passwordInput : Locator
    readonly buttonLogin : Locator
    readonly errorLoginMessage : Locator


    constructor(page:Page){
        super(page)
        this.usernameInput = page.locator('#user-name')
        this.passwordInput = page.locator('#password')  
        this.buttonLogin = page.locator('#login-button')
        this.errorLoginMessage = page.getByTestId('error')
    }
    
    async expectHomePage(){
        await expect(this.page).toHaveURL('/')
    }
    
    async fillLoginForm(userData){
        await this.usernameInput.fill(userData.username)
        await this.passwordInput.fill(userData.password)
        await this.buttonLogin.click()
        return new InventoryPage(this.page)
    }
}