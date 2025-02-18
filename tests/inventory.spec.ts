import { test, expect } from "../fixtures/base.fixture"; 



test.describe('Test Cases inventory saucedemo.com', () => {

    test.beforeEach(async({home, inventory}) => {
        const standardUser = {username:process.env.USERNAME_STANDARD, password:process.env.PASSWORD}
        await home.goto()
        await home.expectHomePage()
        await home.fillLoginForm(standardUser)
        await inventory.expectInventoryPage()
    })

    test('Test Case 1 : Should List by Name (A to Z)', async ({ inventory }) => {
        const sortOptions = { AZ: "az" };
        await inventory.sortByName(sortOptions.AZ);
    });
    test('Test Case 2 : Should List by Name (A to Z)', async ({inventory}) => {
        const sortOptions = {ZA : "za"}
        await inventory.sortByName(sortOptions.ZA)
    })
    test('Test Case 3 : List by Price (Low to High)', async ({inventory}) => {
        const sortOptions = {LOHI : "lohi"}
        await inventory.sortByPrice(sortOptions.LOHI)
    })
    test('Test Case 4 : List by Price (High to Low)', async ({inventory}) => {
        const sortOptions = {HILO : "hilo"}
        await inventory.sortByPrice(sortOptions.HILO)
    })

    test('Test Case 5 : Add to Cart and Then Remove from Cart', async ({inventory}) => {
        //Arrange
        const product = {
            id : 4,
            name: "Sauce Labs Onesie",
        }
        //Act
        await inventory.addOneProductToCart(product.id)
        await expect(inventory.cartCounter).toBeVisible()
        await inventory.deleteOneProduct()
        await expect(inventory.cartCounter).not.toBeVisible()
    })
})