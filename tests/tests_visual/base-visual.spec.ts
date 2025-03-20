import { test } from '../../fixtures/base.fixture';
import { Configuration } from '../../configuration/configuration';
import { checkoutInformationFaker } from '../../factory/checkout.factory';

test.describe('Création de captures d\'écran', () => {
    test.beforeEach('Naviguer vers la page inventaire', async ({ home }) => {
        await home.goTo('/');
        await home.screenshot('loginPage');  
        await home.fillLoginForm(Configuration.STANDARD_USER, Configuration.PASSWORD);
        await home.clickLoginButton();
    });

    test("Capture d'écran de la page des produits", async ({ inventory }) => {
        await inventory.screenshot('inventoryPage'); 
    });

    test("Capture d'écran de la page des détails du produit", async ({ inventory }) => {
        await inventory.clickFirstProductTitle();
        await inventory.item.screenshot('inventoryItemPage'); 
    })

    test("Capture d'écran de la page du panier vide", async ({ cart, header }) => {
        await header.clickShoppingCartLink();
        await cart.screenshot('cartEmptyPage'); 
    });

    test("Capture d'écran de la page du panier", async ({ inventory, cart, header }) => {
        await inventory.clickFirstProductTitle();
        await inventory.item.addProductToCart();
        await header.clickShoppingCartLink();
        await cart.screenshot('cartPage'); 
    })

    test("Capture d'écran de la première étape du checkout", async ({ inventory, cart, header, checkout }) => {
        await inventory.clickFirstProductTitle();
        await inventory.item.addProductToCart();
        await header.clickShoppingCartLink();
        await cart.clickCheckoutButton();
        await checkout.one.screenshot('checkoutStepOnePage'); 
    });

    test("Capture d'écran de la deuxième étape du checkout", async ({ inventory, cart, header, checkout }) => {
        const checkoutData = checkoutInformationFaker();
        await inventory.clickFirstProductTitle();
        await inventory.item.addProductToCart();
        await header.clickShoppingCartLink();
        await cart.clickCheckoutButton();
        await checkout.one.fillCheckoutForm(checkoutData);
        await checkout.two.screenshot('checkoutStepTwoPage'); 
    });

    test("Capture d'écran de la page de confirmation du checkout", async ({ inventory, cart, header, checkout }) => {
        const checkoutData = checkoutInformationFaker();
        await inventory.clickFirstProductTitle();
        await inventory.item.addProductToCart();
        await header.clickShoppingCartLink();
        await cart.clickCheckoutButton();
        await checkout.one.fillCheckoutForm(checkoutData);
        await checkout.two.clickFinish();
        await checkout.two.screenshot('checkoutCompleted'); 
    });
})
