import {Locator,LocatorScreenshotOptions,Page,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class CheckoutStepOnePage extends BasePage {
    //LOCATOR
    readonly locatorCheckoutTitle : Locator
    readonly locatorFirstNameInput : Locator
    readonly locatorLastNameInput : Locator
    readonly locatorZipCodeInput : Locator
    readonly locatorCancelButton : Locator
    readonly locatorContinueButton : Locator
    readonly locatorErrorMessage : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorCheckoutTitle = page.getByTestId('title')
        this.locatorFirstNameInput = page.getByTestId('firstName')
        this.locatorLastNameInput = page.getByTestId('lastName')
        this.locatorZipCodeInput = page.getByTestId('postalCode')
        this.locatorCancelButton = page.getByTestId('cancel')
        this.locatorContinueButton = page.getByTestId('continue')
        this.locatorErrorMessage = page.getByTestId('error')
    }

    async expectCheckoutStepOnePage(){
        await expect(this.page).toHaveURL(/checkout-step-one/)
        await expect(this.locatorCheckoutTitle).toContainText('Checkout: Your Information')
    }

    async fillCheckoutForm(user){
        await this.locatorFirstNameInput.fill(user.firstname)
        await this.locatorLastNameInput.fill(user.lastname)
        await this.locatorZipCodeInput.fill(user.zipcode)
        await this.locatorContinueButton.click()
    }

    async fillFirstName(firstname){
        await this.locatorFirstNameInput.fill(firstname)
    }

    async fillLastName(lastname){
        await this.locatorLastNameInput.fill(lastname)
    }

    async fillZipCode(zipcode){
        await this.locatorZipCodeInput.fill(zipcode)
    }

    async clickCancel(){
        await this.locatorCancelButton.click()
    }

    async clickContinue(){
        await this.locatorContinueButton.click()
    }
}