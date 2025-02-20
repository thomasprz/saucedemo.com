import { test, expect } from "../fixtures/base.fixture";

test.describe('Test Cases inventory Item saucedemo.com', async () => {

    test.beforeEach(async ({home}) => {
        // Arrange
        const standardUser = { username: process.env.USERNAME_STANDARD, password: process.env.PASSWORD };

        // Act
        await home.goto();
        await home.expectHomePage();
        await home.fillLoginForm(standardUser)
    });

    test('Test Case 1 : Open and Close Menu', async ({sidebar}) => {
        await sidebar.openMenu()
        await expect(sidebar.closeMenuButton).toBeVisible();
        await sidebar.closeMenu()
        await expect(sidebar.burgerButton).toBeHidden()
    })

    test('Test Case 2 : Reset App State', async ({inventory, sidebar}) => {
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

    test('Test Case 3 : Visit About', async ({sidebar}) => {
        //Act
        await sidebar.openMenu()
        await sidebar.openAbout()
        await sidebar.expectSauceLabs()
    })

    test('Test Case 4 : Visit All Items', async ({sidebar, inventory}) => {
        //Act
        await sidebar.openMenu()
        await sidebar.openAllItems()
        await inventory.expectInventoryPage()
    })

    test('Test Case 5 : Logout', async ({sidebar, home}) => {
        //Act
        await sidebar.openMenu()
        await sidebar.openLogout()
        await home.expectHomePage()
    })
})