import { test, expect } from "../fixtures/base.fixture";

test.describe('Test Cases inventory Item saucedemo.com', async () => {

    test.beforeEach(async ({home, inventory}) => {
        // Arrange
        const standardUser = { username: process.env.USERNAME_STANDARD, password: process.env.PASSWORD };
        // Act
        await home.goto();
        await home.expectHomePage();
        await home.fillLoginForm(standardUser);
        await inventory.expectInventoryPage();
        await inventory.clickOnItemName(4);
    });

    test('Test Case 1 : Add to Cart and Update Cart Counter', async ({inventoryitem}) => {
        await inventoryitem.addProductToCart();
        await expect(inventoryitem.cartCounter).toBeVisible();
        
        await test.step('Remove from Cart and Update Cart Counter', async () => {
            await inventoryitem.deleteOneProduct();
            await expect(inventoryitem.cartCounter).not.toBeVisible();
        });
    });

    test('Test Case 2 : Return to Inventory Page', async ({inventory, inventoryitem}) => {
        await inventoryitem.backToInventoryPage();
        await inventory.expectInventoryPage();
    });

});
