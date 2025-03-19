import {test, expect} from '../fixtures/base.fixture'

test.describe('Menu', () => {
    test.beforeEach('Naviguer vers la page de connexion', async ({inventory}) => {
        await inventory.goTo('/inventory.html')
        await inventory.expectInventoryPage()
    })

    test("Vérifier que le menu s'ouvre et se ferme correctement.", async ({sidebar }) => {
        //Act
        await sidebar.openMenu()
        await expect(sidebar.locatorMenuContainer).toHaveAttribute('aria-hidden', 'false');
        await sidebar.closeMenu()
        //Assert
        await expect(sidebar.locatorMenuContainer).toHaveAttribute('aria-hidden', 'true');

    });
    test("Vérifier que l'état de l'application est réinitialisé", async ({sidebar, inventory, header}) => {
        //Arrange
        const productData = {
            name:'Sauce Labs Fleece Jacket',
            price : 49.99
        }
        //Act
        await inventory.addOneProductToCart(productData.name)
        const currentCount = await header.getCurrentCartCount();
        await expect(currentCount).toEqual(1)
        await sidebar.openMenu()
        await sidebar.clickResetAppState()
        //Assert
        await expect(header.locatorShoppingCartBadge).toBeHidden()
    });

    test("Vérifier que la page 'À propos' est accessible", async ({sidebar, page}) => {
        //Act
        await sidebar.openMenu()
        await sidebar.clickAbout()
        //Assert
        await expect(page).toHaveURL('https://saucelabs.com/')
    });

    test("Vérifier que tous les articles sont visibles", async ({sidebar,inventory, header}) => {
        //Act
        await header.clickShoppingCartLink()
        await sidebar.openMenu()
        await sidebar.clickAllItems()
        //Assert
        await inventory.expectInventoryPage()
    });

    test("Vérifier que l'utilisateur peut se déconnecter", async ({sidebar,home}) => {
        //Act
        await sidebar.openMenu()
        await sidebar.clickLogout()
        //Assert
        await home.expectLoginPage()
    });
})
