import { test, expect } from "../fixtures/base.fixture";
import { fakeCheckoutInformation } from "../factories/checkout.factory";
import data from '../assets/data/e2e/inventory-item.data.json'

test.describe('Test Cases checkout saucedemo.com', async () => {

    test.beforeEach(async ({home, inventory}) => {
        // Arrange
        const standardUser = { username: process.env.USERNAME_STANDARD, password: process.env.PASSWORD };
        //Act
        await home.goto();
        await home.expectHomePage();
        await home.fillLoginForm(standardUser)
        await inventory.expectInventoryPage()
    })

    test('Test Case 1 : Checkout 1 Article and Go Back Home', async ({checkout, inventory, cart}) => {
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

    test.only('Test Case 2 : Checkout 3 Articles and Go Back Home', async ({checkout, inventory, cart}) => {
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