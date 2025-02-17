import { test, expect } from "../fixtures/base.fixture"; 



test.describe('Test Cases inventory saucedemo.com', () => {

    test.beforeEach(async({home, inventory}) => {
        const standardUser = {username:process.env.USERNAME_STANDARD, password:process.env.PASSWORD}
        await home.goto()
        await home.expectHomePage()
        await home.fillLoginForm(standardUser)
        await inventory.expectInventoryPage()
    })

    test('Test Case 1 : Should List by Name (Z to A)', async ({inventory}) => {
        //Arrange
        const sortOptions = {AZ : "az"}
        //Act & Assert
        await inventory.sortBy(sortOptions.AZ)
    })
    test('Test Case 2 : Should List by Name (A to Z)', async ({inventory}) => {
        //Arrange
        const sortOptions = {ZA : "za"}
        //Act & Assert
        await inventory.sortBy(sortOptions.ZA)
    })
    test('Test Case 3 : List by Price (Low to High)', async ({inventory}) => {
        //Arrange
        const sortOptions = {LOHI : "lohi"}
        //Act & Assert
        await inventory.sortBy(sortOptions.LOHI)
    })
    test('Test Case 4 : List by Price (High to Low)', async ({inventory}) => {
        //Arrange
        const sortOptions = {HILO : "hilo"}
        //Act & Assert
        await inventory.sortBy(sortOptions.HILO)
    })
})