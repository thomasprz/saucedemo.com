import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';
import { CheckoutStepOnePage } from './checkout-step-one.page';
import { CheckoutStepTwoPage } from './checkout-step-two.page';
import { CheckoutCompletePage } from './checkout-complete.page';

export class CheckoutPage extends BasePage{
    readonly stepOne : CheckoutStepOnePage
    readonly stepTwo : CheckoutStepTwoPage
    readonly complete : CheckoutCompletePage


    constructor(page:Page){
        super(page)
        this.stepOne = new CheckoutStepOnePage(this.page)
        this.stepTwo = new CheckoutStepTwoPage(this.page)
        this.complete =  new CheckoutCompletePage(this.page)
    }
}