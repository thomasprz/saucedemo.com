import { test } from '../../fixtures/base.fixture';
import { Configuration } from '../../configuration/configuration';
import { checkoutInformationFaker } from '../../factory/checkout.factory';

test.describe('Visual User', () => {
    
    test("Création et finalisation de la commande", async ({ home, inventory, cart, checkout, header, page }) => {
        // Arrange
        const checkoutData = checkoutInformationFaker();
        // Act
        await home.goTo('/');
        await home.expectLoginPage();
        await home.expectScreenshot('loginPage');
        await home.fillLoginForm(Configuration.VISUAL_USER, Configuration.PASSWORD);
        await home.clickLoginButton();
        await inventory.expectScreenshot('inventoryPage');
        await header.clickShoppingCartLink();
        await cart.expectScreenshot('cartPageEmpty');
        await cart.clickContinueShopping();
        await inventory.clickFirstProductTitle();
        await inventory.item.expectScreenshot('inventoryItemPage');
        await inventory.item.addProductToCart();
        await header.clickShoppingCartLink();
        await cart.expectScreenshot('cartPage');
        await cart.clickCheckoutButton();
        await checkout.one.expectScreenshot('checkoutStepOnePage');
        await checkout.one.fillCheckoutForm(checkoutData);
        await checkout.two.expectScreenshot('checkoutStepTwoPage');
        await checkout.two.clickFinish();
        //Assert
        await checkout.complete.expectScreenshot('checkoutCompleted');
        await checkout.complete.clickBackHome();
    });
});
