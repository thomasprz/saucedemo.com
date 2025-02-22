import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page'
import { InventoryPage } from './inventory.page'

export class LoginPage extends BasePage{
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
    
    async fillLoginForm(username, password){
        await this.goto()
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.buttonLogin.click()
        return new InventoryPage(this.page)
    }

    async fillUsername(username){
        await this.goto()
        await this.usernameInput.fill(username)
    }

    async fillPassword(password){
        await this.goto()
        await this.passwordInput.fill(password)
    }

    async clickButtonLogin(){
        await this.buttonLogin.click()
        return new InventoryPage(this.page)
    }
}