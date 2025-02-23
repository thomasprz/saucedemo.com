import { test, expect } from "../fixtures/base.fixture";
import { logger } from "../helpers/logger.helper";
// Allure Data & Tags
import * as report from '../assets/data/report/allure.data.json' // * -> Pratique courante avec JSON permettant d'importer toutes les propriétés du fichier JSON sous un seul alias. 
import * as allure from 'allure-js-commons'; //Importation du module allure
import { Severity } from 'allure-js-commons'; // Criticité du test
import { Configuration } from "../config/configuration";
import { inventoryData } from "../assets/data/e2e/inventory.data";


test.describe('Menu', { tag: [report.tags.regression] }, () => {

    test.beforeEach(async ({login}) => {
        logger.info(`Running ${test.info().title}`);
        await allure.parentSuite(report.parent_suite.v001); // Organise les tests dans une hiérarchie de suites. Ex : dossier v001
        await allure.epic(report.epic.application);
        await allure.feature(report.feature.menu);
        await allure.severity(Severity.CRITICAL);
        await allure.owner(report.owner.tpr);

        await login.goto(inventoryData.inventoryURL);
    });

    test.afterEach('Close the page', async ({ base }, testInfo) => {
        logger.info(`Finished ${testInfo.title} with status ${testInfo.status}`);
        await base.closePage();
     })

    test('Open and Close Menu', async ({sidebar}) => {
        await sidebar.openMenu()
        await expect(sidebar.closeMenuButton).toBeVisible();
        await sidebar.closeMenu()
        await expect(sidebar.burgerButton).toBeHidden()
    })

    test('Reset App State', async ({inventory, sidebar}) => {
        //Arrange
        const product = {
            name: 'Test.allTheThings() T-Shirt (Red)'
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await expect(inventory.cartCounter).toHaveCount(1)
        await sidebar.openMenu()
        await sidebar.clickAppState()
        await expect(inventory.cartCounter).not.toBeVisible()
    })

    test('Visit About', async ({sidebar}) => {
        //Act
        await sidebar.openMenu()
        await sidebar.openAbout()
        await sidebar.expectSauceLabs()
    })

    test('Visit All Items', async ({sidebar, inventory}) => {
        //Act
        await sidebar.openMenu()
        await sidebar.openAllItems()
        await inventory.expectInventoryPage()
    })

    test('Logout', async ({sidebar, login}) => {
        //Act
        await sidebar.openMenu()
        await sidebar.openLogout()
    })
})