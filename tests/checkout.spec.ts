import { test, expect } from "../fixtures/base.fixture";
import { fakeCheckoutInformation } from "../factories/checkout.factory";
import { logger } from "../helpers/logger.helper";
// Allure Data & Tags
import * as report from '../assets/data/report/allure.data.json' // * -> Pratique courante avec JSON permettant d'importer toutes les propriétés du fichier JSON sous un seul alias. 
import * as allure from 'allure-js-commons'; //Importation du module allure
import { Severity } from 'allure-js-commons'; // Criticité du test
import { Configuration } from "../config/configuration";


test.describe('Checkout', {tag : [report.tags.regression]}, async () => {

    test.beforeEach(async ({login, inventory, cart, checkout}) => {
        // Arrange
        const standardUser = { username: process.env.USERNAME_STANDARD, password: process.env.PASSWORD };
        //Act
        await login.goto();
        await login.expectHomePage();
        await login.fillLoginForm(Configuration.user, Configuration.password)
        await inventory.expectInventoryPage()
        logger.info(`Running ${test.info().title}`);

        await allure.parentSuite(report.parent_suite.v001); // Organise les tests dans une hiérarchie de suites. Ex : dossier v001
        await allure.epic(report.epic.application);
        await allure.feature(report.feature.checkout);
        await allure.severity(Severity.CRITICAL);
        await allure.owner(report.owner.tpr);
    })

    test.afterEach('Close the page', async ({ base }, testInfo) => {
        logger.info(`Finished ${testInfo.title} with status ${testInfo.status}`);
        await base.closePage();
     })

    test('Checkout', async ({checkout, inventory, cart}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation()
        const product = {
            name: 'Sauce Labs Backpack', 
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
        await checkout.stepOne.fillCheckoutFields(userDataInformation)
        await checkout.stepOne.clickContinue()
        //Assert
        await checkout.stepTwo.expectCheckoutStepTwo()
    })

    test('Not Checkout with Empty Form', async ({checkout, inventory, cart}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation()
        const product = {
            name: 'Sauce Labs Backpack', 
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
        await checkout.stepOne.clickContinue()
        //Assert
        await expect(checkout.stepOne.errorMessage).toBeVisible()
        })

    test('Not Checkout Without First Name', async ({checkout, inventory, cart}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation();
        const product = {
            name: 'Sauce Labs Backpack', 
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
        await checkout.stepOne.fillFieldLastName(userDataInformation.lastname)
        await checkout.stepOne.fillFieldZipCode(userDataInformation.zipcode)
        await checkout.stepOne.clickContinue()
        //Assert
        await expect(checkout.stepOne.errorMessage).toBeVisible()
        })

    test('Not Checkout Without Last Name', async ({checkout, inventory, cart}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation();
        const product = {
            name: 'Sauce Labs Backpack', 
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
        await checkout.stepOne.fillFieldFirstName(userDataInformation.firstname)
        await checkout.stepOne.fillFieldZipCode(userDataInformation.zipcode)
        await checkout.stepOne.clickContinue()
        //Assert
        await expect(checkout.stepOne.errorMessage).toBeVisible()
        })

    test('Not Checkout Without Zip Code', async ({checkout, inventory, cart}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation();
        const product = {
            name: 'Sauce Labs Backpack', 
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
        await checkout.stepOne.fillFieldFirstName(userDataInformation.firstname)
        await checkout.stepOne.fillFieldLastName(userDataInformation.lastname)
        await checkout.stepOne.clickContinue()
        //Assert
        await expect(checkout.stepOne.errorMessage).toBeVisible()
        })
        
    test('Cancel on Step One', async ({checkout, inventory, cart}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation();
        const product = {
            name: 'Sauce Labs Backpack', 
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
        await checkout.stepOne.clickCancel()
        //Assert
        await cart.expectCartPage()
    })

    test('Cancel on Step Two', async ({checkout, inventory, cart}) => {
        //Arrange 
        const userDataInformation = fakeCheckoutInformation()
        const product = {
            name: 'Sauce Labs Backpack', 
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
        await checkout.stepOne.fillCheckoutFields(userDataInformation)
        await checkout.stepOne.clickContinue()
        await checkout.stepTwo.expectCheckoutStepTwo()
        await checkout.stepTwo.clickCancel()
        //Assert
        await inventory.expectInventoryPage()
    })

    test('Checkout and Go Back Home', async ({checkout, inventory, cart}) => {
        //Arrange 
        const userDataInformation = fakeCheckoutInformation()
        const product = {
            name: 'Sauce Labs Backpack', 
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
        await checkout.stepOne.fillCheckoutFields(userDataInformation)
        await checkout.stepOne.clickContinue()
        await checkout.stepTwo.expectCheckoutStepTwo()
        await checkout.stepTwo.clickFinish()
        await checkout.complete.expectCheckoutCompletePage()
        await checkout.complete.clickBackHome()
        //Assert
        await inventory.expectInventoryPage()
    })

    test('Checkout 1 Article and Go Back Home', async ({checkout, inventory, cart}) => {
        //Arrange 
        const userDataInformation = fakeCheckoutInformation()
        const product = {
            name: 'Sauce Labs Backpack', 
            price : 29.99,
            quantity : '1',
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
        await checkout.stepOne.fillCheckoutFields(userDataInformation)
        await checkout.stepOne.clickContinue()
        await checkout.stepTwo.expectCheckoutStepTwo()
        await checkout.stepTwo.expectOneProduct(product)
        await checkout.stepTwo.clickFinish()
        await checkout.complete.expectCheckoutCompletePage()
        await checkout.complete.clickBackHome()
        //Assert
        await inventory.expectInventoryPage()
    })

    test('Checkout 3 Articles and Go Back Home', async ({checkout, inventory, cart}) => {
        //Arrange 
        const userDataInformation = fakeCheckoutInformation()
        const product = [
            {
                name: 'Sauce Labs Backpack',
                price: 29.99,
                quantity: '1', // Assurez-vous que c'est une chaîne de caractères
            },
            {
                name: 'Sauce Labs Fleece Jacket',
                price: 49.99,
                quantity: '1', // Assurez-vous que c'est une chaîne de caractères
            },
        ];
        //Act
        await inventory.addProductsToCart(product)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
        await checkout.stepOne.fillCheckoutFields(userDataInformation)
        await checkout.stepOne.clickContinue()
        await checkout.stepTwo.expectCheckoutStepTwo()
        await checkout.stepTwo.expectProducts(product)
        await checkout.stepTwo.clickFinish()
        await checkout.complete.expectCheckoutCompletePage()
        await checkout.complete.clickBackHome()
        //Assert
        await inventory.expectInventoryPage()
    })
})