import { test, expect } from "../fixtures/base.fixture";
import { logger } from "../helpers/logger.helper";
// Allure Data & Tags
import * as report from '../assets/data/report/allure.data.json' // * -> Pratique courante avec JSON permettant d'importer toutes les propriétés du fichier JSON sous un seul alias. 
import * as allure from 'allure-js-commons'; //Importation du module allure
import { Severity } from 'allure-js-commons'; // Criticité du test
import { Configuration } from "../config/configuration";


test.describe('Inventory Item', {tag : [report.tags.regression]}, async () => {

    test.beforeEach(async ({login, inventory}) => {
        // Arrange
        const standardUser = { username: process.env.USERNAME_STANDARD, password: process.env.PASSWORD };
        // Act
        await login.goto();
        await login.expectHomePage();
        await login.fillLoginForm(Configuration.user, Configuration.password)
        await inventory.expectInventoryPage();
        await inventory.clickOnItemName(4);
        logger.info(`Running ${test.info().title}`);

        await allure.parentSuite(report.parent_suite.v001); // Organise les tests dans une hiérarchie de suites. Ex : dossier v001
        await allure.epic(report.epic.application);
        await allure.feature(report.feature.inventoryitem);
        await allure.severity(Severity.CRITICAL);
        await allure.owner(report.owner.tpr);
    });

    test.afterEach('Close the page', async ({ base }, testInfo) => {
        logger.info(`Finished ${testInfo.title} with status ${testInfo.status}`);
        await base.closePage();
     })

    test('Add to Cart and Update Cart Counter', async ({inventoryitem}) => {
        await inventoryitem.addProductToCart();
        await expect(inventoryitem.cartCounter).toBeVisible();
        
        await test.step('Remove from Cart and Update Cart Counter', async () => {
            await inventoryitem.deleteOneProduct();
            await expect(inventoryitem.cartCounter).not.toBeVisible();
        });
    });

    test('Return to Inventory Page', async ({inventory, inventoryitem}) => {
        await inventoryitem.backToInventoryPage();
        await inventory.expectInventoryPage();
    });

});
