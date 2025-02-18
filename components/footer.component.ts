import {Page, Locator, expect} from '@playwright/test'

export class FooterComponent {
    readonly page : Page
    readonly linkTwitter : Locator
    readonly linkFacebook : Locator
    readonly linkLinkedin : Locator
    readonly footerCopyright : Locator

    constructor(page:Page){
        this.page = page
        this.linkTwitter = page.getByRole('link', {name:"Twitter"})
        this.linkFacebook = page.getByRole('link', {name:"Facebook"})
        this.linkLinkedin = page.getByRole('link', {name:"LinkedIn"})
        this.footerCopyright = page.getByTestId('footer-copy')
    }
}