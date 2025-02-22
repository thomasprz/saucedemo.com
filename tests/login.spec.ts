//* Fixtures
import { test, expect } from "../fixtures/base.fixture";
//* Fake Data Generation
import {fakeLoginData} from '../factories/login.factory'
//* Error message Login pour Assertion
import { loginData } from "../assets/data/e2e/login.data";
//* Winston Logs (logger.info)
import { logger } from "../helpers/logger.helper";
// Allure Data & Tags
import * as report from '../assets/data/report/allure.data.json' // * -> Pratique courante avec JSON permettant d'importer toutes les propriétés du fichier JSON sous un seul alias. 
import * as allure from 'allure-js-commons'; //Importation du module allure
import { Severity } from 'allure-js-commons'; // Criticité du test
// Class des users
import { Configuration } from "../config/configuration";

test.describe('Login', { tag: [report.tags.regression] }, () => {
    test.use({ storageState: { cookies: [], origins: [] } }); // Cette configuration assure que le test démarre dans un état "propre", sans cookies ni données d'origine préexistantes

    test.beforeEach('Initial Setup', async ({ login }) => {
        logger.info(`Running ${test.info().title}`);

        await allure.parentSuite(report.parent_suite.v001); // Organise les tests dans une hiérarchie de suites. Ex : dossier v001
        await allure.epic(report.epic.application);
        await allure.feature(report.feature.authentication);
        await allure.owner(report.owner.tpr);
     });
     
     test.afterEach('Close the page', async ({ base }, testInfo) => {
        logger.info(`Finished ${testInfo.title} with status ${testInfo.status}`);
        await base.closePage();
     })

test.describe('Login to specific user', () => {
    test.beforeEach('Add running test title', async () => {
        await allure.severity(Severity.CRITICAL);
    });

    test('Login with user "standard_user"', async ({login, inventory}) => {
        //Act
        await login.fillLoginForm(Configuration.user, Configuration.password)
        //Expect
        await inventory.expectInventoryPage()
    })

    test('Login with user "visual_user"', async ({login, inventory}) => {
        //Act
        await login.fillLoginForm(Configuration.userVisual, Configuration.password)
        //Expect
        await inventory.expectInventoryPage()
    })

    test('Login with user "error_user"', async ({login, inventory}) => {
        //Act
        await login.fillLoginForm(Configuration.userError, Configuration.password)
        //Expect
        await inventory.expectInventoryPage()
    })

    test('Login with user "problem_user"', async ({login, inventory}) => {
        //Act
        await login.fillLoginForm(Configuration.userProblem, Configuration.password)
        //Expect
        await inventory.expectInventoryPage()
    })

    test('Login with user "performance_user"', async ({login, inventory}) => {
        //Act
        await login.fillLoginForm(Configuration.userPerformance, Configuration.password)
        //Expect
        await inventory.expectInventoryPage()
    })
})

test.describe('Login with error status', () => {
    test.beforeEach('Add running test title', async () => {
        await allure.severity(Severity.NORMAL);
    });

    test('Login with user Wrong Credentials', async ({login, inventory}) => {
        //Arrange
        const wrongCredentialsUser = fakeLoginData()
        //Act
        await login.fillLoginForm('test', 'password')
        //Expect
        await expect(login.errorLoginMessage).toBeVisible()
        await expect(login.errorLoginMessage).toContainText(loginData.incorrectCredentials)
    })

    test('Login with Locked User ', async ({login}) => {
        //Act
        await login.fillLoginForm(Configuration.userLocked, Configuration.password)
        //Assert
        await expect(login.errorLoginMessage).toBeVisible
        await expect(login.errorLoginMessage).toContainText(loginData.locked_user)
    })

    test('Login with Empty User ', async ({login}) => {
        //Act
        await login.fillPassword(Configuration.password)
        await login.clickButtonLogin()
        //Assert
        await expect(login.errorLoginMessage).toBeVisible
        await expect(login.errorLoginMessage).toContainText(loginData.requiredUsername)
    })

    test('Login with Empty Password ', async ({login}) => {
        //Act
        await login.fillUsername(Configuration.user)
        await login.clickButtonLogin()
        //Assert
        await expect(login.errorLoginMessage).toBeVisible
        await expect(login.errorLoginMessage).toContainText(loginData.requiredPassword)
    })

    test('Login with Empty Credential ', async ({login}) => {
        //Act
        await login.clickButtonLogin()
        //Assert
        await expect(login.errorLoginMessage).toBeVisible
        await expect(login.errorLoginMessage).toContainText(loginData.requiredUsername)
    })
  })
})