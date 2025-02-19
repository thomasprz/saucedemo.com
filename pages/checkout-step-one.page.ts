import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';
import { CheckoutStepTwoPage } from './checkout-step-two.page';
import { CartPage } from './cart.page';

export class CheckoutStepOnePage extends BasePage {
    readonly headerCheckoutInformation : Locator
    readonly firstNameInput : Locator
    readonly lastNameInput : Locator
    readonly zipcodeInput : Locator
    readonly buttonContinue : Locator
    readonly buttonCancel : Locator
    readonly errorMessage : Locator

    constructor(page:Page){
        super(page)
        this.headerCheckoutInformation = page.getByTestId('title')
        this.firstNameInput = page.getByTestId('firstName')
        this.lastNameInput = page.getByTestId('lastName')
        this.zipcodeInput = page.getByTestId('postalCode')
        this.buttonContinue = page.getByTestId('continue')
        this.buttonCancel = page.getByTestId('cancel')
        this.errorMessage = page.getByTestId('error')
    }

    async expectCheckoutStepOnePage() {
        await expect(this.page).toHaveURL('/checkout-step-one.html')
        await expect(this.headerCheckoutInformation).toBeVisible()
    }

    async fillFieldFirstName(firstname){
        await this.firstNameInput.fill(firstname)
    }

    async fillFieldLastName(lastname){
        await this.lastNameInput.fill(lastname)
    }

    async fillFieldZipCode(zipcode){
        await this.zipcodeInput.fill(zipcode)
    }

    async fillCheckoutFields(userCheckout) {
        await this.fillFieldFirstName(userCheckout.firstname)
        await this.fillFieldLastName(userCheckout.lastname)
        await this.fillFieldZipCode(userCheckout.zipcode)
    }
    
    async clickContinue(){
        await this.buttonContinue.click()
        return new CheckoutStepTwoPage(this.page)
    }

    async clickCancel(){
        await this.buttonCancel.click()
        return new CartPage(this.page)
    }
}