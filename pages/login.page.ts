import{Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class LoginPage extends BasePage{
    //LOCATOR
    readonly locatorUsernameInput : Locator
    readonly locatorPasswordInput : Locator
    readonly locatorLoginButton : Locator


    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorUsernameInput = page.getByTestId('username')
        this.locatorPasswordInput = page.getByTestId('password')
        this.locatorLoginButton = page.getByTestId('login-button')
    }

    async expectLoginPage(){
        await expect(this.page).toHaveURL('/')
    }

    async fillLoginForm(user){
        await this.locatorUsernameInput.fill(user.username)
        await this.locatorPasswordInput.fill(user.password)
        await this.locatorLoginButton.click()
    }
}