import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from '../pages/base.page'

export class FooterComponent extends BasePage {
    readonly linkTwitter : Locator
    readonly linkFacebook : Locator
    readonly linkLinkedin : Locator
    readonly footerCopyright : Locator

    constructor(page:Page){
        super(page)
        this.linkTwitter = page.getByRole('link', {name:"Twitter"})
        this.linkFacebook = page.getByRole('link', {name:"Facebook"})
        this.linkLinkedin = page.getByRole('link', {name:"LinkedIn"})
        this.footerCopyright = page.getByTestId('footer-copy')
    }
}