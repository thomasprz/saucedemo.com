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
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.buttonLogin = page.locator('#login-button');
        this.errorLoginMessage = page.getByTestId('error')
      }    

      async fillUsername(user) {
        await this.usernameInput.fill(user);
      }
    
      async fillPassword(password) {
        await this.passwordInput.fill(password);
      }
     
      async clickLogin() {
        await this.buttonLogin.click();
      }
    
      async logIn(user, password){
        await this.goto();
        await this.fillUsername(user);
        await this.fillPassword(password);
        await this.clickLogin();
        return new InventoryPage(this.page);
      }
    
      async logInWithoutCredentials() {
        await this.goto();
        await this.clickLogin();
      }
    
      async logInWithoutUsername(password) {
        await this.goto();
        await this.fillPassword(password);
        await this.clickLogin();
      }
    
      async logInWithoutPassword(user) {
        await this.goto();
        await this.fillUsername(user);
        await this.clickLogin();
      }
}