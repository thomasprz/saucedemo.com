import { test, expect } from "../fixtures/base.fixture"; 
import data from '../assets/data/e2e/inventory-item.data.json'
import { logger } from "../helpers/logger.helper";
// Allure Data & Tags
import * as report from '../assets/data/report/allure.data.json' // * -> Pratique courante avec JSON permettant d'importer toutes les propriétés du fichier JSON sous un seul alias. 
import * as allure from 'allure-js-commons'; //Importation du module allure
import { Severity } from 'allure-js-commons'; // Criticité du test
import { Configuration } from "../config/configuration";


test.describe('Inventory', {tag : [report.tags.regression]}, () => {

    test.beforeEach(async({login, inventory}) => {
        const standardUser = {username:process.env.USERNAME_STANDARD, password:process.env.PASSWORD}
        await login.goto()
        await login.expectHomePage()
        await login.fillLoginForm(Configuration.user, Configuration.password)
        await inventory.expectInventoryPage()
        logger.info(`Running ${test.info().title}`);

        await allure.parentSuite(report.parent_suite.v001); // Organise les tests dans une hiérarchie de suites. Ex : dossier v001
        await allure.epic(report.epic.application);
        await allure.feature(report.feature.inventory);
        await allure.severity(Severity.CRITICAL);
        await allure.owner(report.owner.tpr);

    })

    test.afterEach('Close the page', async ({ base }, testInfo) => {
        logger.info(`Finished ${testInfo.title} with status ${testInfo.status}`);
        await base.closePage();
     })

    test('Should List by Name (A to Z)', async ({ inventory }) => {
        const sortOptions = { AZ: "az" };
        await inventory.sortByName(sortOptions.AZ);
    });
    test('Should List by Name (Z to A)', async ({inventory}) => {
        const sortOptions = {ZA : "za"}
        await inventory.sortByName(sortOptions.ZA)
    })
    test('List by Price (Low to High)', async ({inventory}) => {
        const sortOptions = {LOHI : "lohi"}
        await inventory.sortByPrice(sortOptions.LOHI)
    })
    test('List by Price (High to Low)', async ({inventory}) => {
        const sortOptions = {HILO : "hilo"}
        await inventory.sortByPrice(sortOptions.HILO)
    })

    test('Add to Cart and Then Remove from Cart', async ({inventory}) => {
        //Act
        await inventory.addOneProductToCart(2)
        await expect(inventory.cartCounter).toBeVisible()
        await inventory.deleteOneProduct()
        await expect(inventory.cartCounter).not.toBeVisible()
    })
})