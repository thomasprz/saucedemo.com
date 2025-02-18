import { test, expect } from "../fixtures/base.fixture";

test.describe('Test Cases inventory Item saucedemo.com', async () => {

    test.beforeEach(async ({home, inventory, cart}) => {
        // Arrange
        const standardUser = { username: process.env.USERNAME_STANDARD, password: process.env.PASSWORD };
        const products = [
            { name: 'Sauce Labs Backpack' },
            { name: 'Sauce Labs Bike Light' },
            { name: 'Sauce Labs Bolt T-Shirt' }
        ];
        
        // Act
        await home.goto();
        await home.expectHomePage();
        await home.fillLoginForm(standardUser)
        await inventory.addProductsToCart(products)
        await inventory.clickOnCartLink()
        await cart.expectCartPage()
    });

    test('Test Case 1 : Remove Item and Decrease Cart Counter', async ({cart}) => {
        await cart.deleteAllProducts()
        await expect(cart.cartCounter).not.toBeVisible()
    })

})