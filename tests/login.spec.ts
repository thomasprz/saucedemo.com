import { test, expect } from "../fixtures/base.fixture";
import {fakeLoginData} from '../factories/login.factory'
import data from "../assets/data/e2e/login.data.json"


test.describe('Test Cases login saucedemo.com', () => {

    test.beforeEach(async ({ home }) => {
        await home.goto()
        await home.expectHomePage()
    })

    test('Test Case 1 : Login with user "standard_user"', async ({home, inventory}) => {
        //Arrange
        const standardUser = {
            username : process.env.USERNAME_STANDARD,
            password : process.env.PASSWORD,
        }
        //Act
        await home.fillLoginForm(standardUser)
        //Expect
        await inventory.expectInventoryPage()
    })

    test('Test Case 2 : Login with user "visual_user"', async ({home, inventory}) => {
        //Arrange
        const visualUser = {
            username : process.env.USERNAME_VISUAL,
            password : process.env.PASSWORD,
        }
        //Act
        await home.fillLoginForm(visualUser)
        //Expect
        await inventory.expectInventoryPage()
    })

    test('Test Case 3 : Login with user "error_user"', async ({home, inventory}) => {
        //Arrange
        const errorUser = {
            username : process.env.USERNAME_ERROR,
            password : process.env.PASSWORD,
        }
        //Act
        await home.fillLoginForm(errorUser)
        //Expect
        await inventory.expectInventoryPage()
    })

    test('Test Case 4 : Login with user "problem_user"', async ({home, inventory}) => {
        //Arrange
        const problemdUser = {
            username : process.env.USERNAME_PROBLEM,
            password : process.env.PASSWORD,
        }
        //Act
        await home.fillLoginForm(problemdUser)
        //Expect
        await inventory.expectInventoryPage()
    })

    test('Test Case 5 : Login with user "performance_user"', async ({home, inventory}) => {
        //Arrange
        const performancedUser = {
            username : process.env.USERNAME_GLITCH,
            password : process.env.PASSWORD,
        }
        //Act
        await home.fillLoginForm(performancedUser)
        //Expect
        await inventory.expectInventoryPage()
    })

    test('Test Case 6 : login with user Wrong Credentials', async ({home, inventory}) => {
        //Arrange
        const wrongCredentialsUser = fakeLoginData()
        //Act
        await home.fillLoginForm(wrongCredentialsUser)
        //Expect
        await expect(home.errorLoginMessage).toBeVisible()
        await expect(home.errorLoginMessage).toContainText(data.incorrectCredentials.message)
    })

    test('Test case 7 : login with Locked User ', async ({home}) => {
        //Arrange
        const lockedUser = {
            username : process.env.USERNAME_LOCKED,
            password : process.env.PASSWORD,
        }
        //Act
        await home.fillLoginForm(lockedUser)
        //Assert
        await expect(home.errorLoginMessage).toBeVisible
        await expect(home.errorLoginMessage).toContainText(data.lockedUser.message)
    })

    test('Test case 8 : Login with Empty User ', async ({home}) => {
        //Arrange
        const emptyUsernamedUser = {
            username : '',
            password : 'thomas',
        }
        //Act
        await home.fillLoginForm(emptyUsernamedUser)
        //Assert
        await expect(home.errorLoginMessage).toBeVisible
        await expect(home.errorLoginMessage).toContainText(data.usernameRequired.message)
    })

    test('Test case 9 : Login with Empty Password ', async ({home}) => {
        //Arrange
        const emptyPasswordUser = {
            username : 'thomas',
            password : '',
        }
        //Act
        await home.fillLoginForm(emptyPasswordUser)
        //Assert
        await expect(home.errorLoginMessage).toBeVisible
        await expect(home.errorLoginMessage).toContainText(data.passwordRequired.message)
    })

    test('Test case 10 : Login with Empty Credential ', async ({home}) => {
        //Arrange
        const emptyUserData = {
            username : '',
            password : '',
        }
        //Act
        await home.fillLoginForm(emptyUserData)
        //Assert
        await expect(home.errorLoginMessage).toBeVisible
        await expect(home.errorLoginMessage).toContainText(data.usernameRequired.message)
    })

})