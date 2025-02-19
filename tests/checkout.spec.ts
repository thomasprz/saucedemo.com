import { test, expect } from "../fixtures/base.fixture";
import { fakeCheckoutInformation } from "../factories/checkout.factory";

test.describe('Test Cases checkout saucedemo.com', async () => {

    test.beforeEach(async ({home, inventory, cart, checkout}) => {
        // Arrange
        const standardUser = { username: process.env.USERNAME_STANDARD, password: process.env.PASSWORD };
        //Act
        await home.goto();
        await home.expectHomePage();
        await home.fillLoginForm(standardUser)
        await inventory.expectInventoryPage()
        await inventory.addOneProductToCart(1)
        await inventory.clickOnCartLink()
        await cart.clickCheckout()
        await checkout.stepOne.expectCheckoutStepOnePage()
    })

    test('Test Case 1 : Checkout', async ({checkout}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation()
        //Act
        await checkout.stepOne.fillCheckoutFields(userDataInformation)
        await checkout.stepOne.clickContinue()
        //Assert
        await checkout.stepTwo.expectCheckoutStepTwo()
    })

    test('Test Case 2 : Not Checkout with Empty Form', async ({checkout}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation()
        //Act
        await checkout.stepOne.clickContinue()
        //Assert
        await expect(checkout.stepOne.errorMessage).toBeVisible()
        })

    test('Test Case 3 : Not Checkout Without First Name', async ({checkout}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation();
        //Act
        await checkout.stepOne.fillFieldLastName(userDataInformation.lastname)
        await checkout.stepOne.fillFieldZipCode(userDataInformation.zipcode)
        await checkout.stepOne.clickContinue()
        //Assert
        await expect(checkout.stepOne.errorMessage).toBeVisible()
        })

    test('Test Case 4 : Not Checkout Without Last Name', async ({checkout}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation();
        //Act
        await checkout.stepOne.fillFieldFirstName(userDataInformation.firstname)
        await checkout.stepOne.fillFieldZipCode(userDataInformation.zipcode)
        await checkout.stepOne.clickContinue()
        //Assert
        await expect(checkout.stepOne.errorMessage).toBeVisible()
        })

    test('Test Case 5 : Not Checkout Without Zip Code', async ({checkout}) => {
        //Arrange
        const userDataInformation = fakeCheckoutInformation();
        //Act
        await checkout.stepOne.fillFieldFirstName(userDataInformation.firstname)
        await checkout.stepOne.fillFieldLastName(userDataInformation.lastname)
        await checkout.stepOne.clickContinue()
        //Assert
        await expect(checkout.stepOne.errorMessage).toBeVisible()
        })
        
    test('Test Case 6 : Cancel on Step One', async ({checkout, cart}) => {
        //Act
        await checkout.stepOne.clickCancel()
        //Assert
        await cart.expectCartPage()
    })

    test('Test Case 7 : Cancel on Step Two', async ({checkout, inventory}) => {
        //Arrange 
        const userDataInformation = fakeCheckoutInformation()
        //Act
        await checkout.stepOne.fillCheckoutFields(userDataInformation)
        await checkout.stepOne.clickContinue()
        await checkout.stepTwo.expectCheckoutStepTwo()
        await checkout.stepTwo.clickCancel()
        //Assert
        await inventory.expectInventoryPage()
    })

    test('Test Case 8 : Checkout and Go Back Home', async ({checkout, inventory}) => {
        //Arrange 
        const userDataInformation = fakeCheckoutInformation()
        //Act
        await checkout.stepOne.fillCheckoutFields(userDataInformation)
        await checkout.stepOne.clickContinue()
        await checkout.stepTwo.expectCheckoutStepTwo()
        await checkout.stepTwo.clickFinish()
        await checkout.complete.expectCheckoutCompletePage()
        await checkout.complete.clickBackHome()
        //Assert
        await inventory.expectInventoryPage()
    })
})