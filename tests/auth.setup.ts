import * as report from '../assets/data/report/allure.data.json';
import { Configuration } from "../config/configuration";
import { test as setup } from '../fixtures/base.fixture'; //Ici, vous importez une fonction ou un objet nommé test depuis le fichier base.fixture.ts.
// En utilisant as setup, vous créez un alias pour cette importation. Cela signifie que dans le fichier où vous faites cette importation, vous pouvez utiliser setup pour faire référence à test.
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

setup('Log in to standard user account', async ({ login, inventory, page }) => {

    await allure.parentSuite(report.parent_suite.v001);
    await allure.epic(report.epic.application);
    await allure.feature(report.feature.authentication);
    await allure.severity(Severity.CRITICAL)
    await allure.owner(report.owner.tpr);

    // Act
    await login.logIn(Configuration.user, Configuration.password);
    // Assert
    await inventory.expectInventoryPage();
    // Arrange
    await page.context().storageState({ path: '.auth/user.json' });
    await page.close();
});
