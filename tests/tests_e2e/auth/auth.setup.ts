import { test as setup } from "../../../fixtures/base.fixture"
import { Configuration } from "../../../configuration/configuration"

setup('Authentification avec le standard_user', async ({ home, page, inventory }) => {
    await home.goTo('/');
    await home.fillLoginForm(Configuration.STANDARD_USER, Configuration.PASSWORD);
    await home.clickLoginButton();
    await inventory.expectInventoryPage();
    await page.context().storageState({ path: '.auth/standard_user.json' });
});

// Authentification pour le error_user
setup('Authentification avec le error_user', async ({ home, page, inventory }) => {
    await home.goTo('/');
    await home.fillLoginForm(Configuration.ERROR_USER, Configuration.PASSWORD);
    await home.clickLoginButton();
    await inventory.expectInventoryPage();
    await page.context().storageState({ path: '.auth/error_user.json' });
});