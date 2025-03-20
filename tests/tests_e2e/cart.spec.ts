import {test,expect} from '../../fixtures/base.fixture'

test.describe('Panier', () => {
    test.beforeEach('Naviguer vers la page inventaire', async ({inventory}) => {
        await inventory.goTo('/inventory.html')
        await inventory.expectInventoryPage()
    })

    test('Retirer un produit du panier et vérifier que le compteur du panier diminue', async ({cart,inventory,header}) => {
        //Arrange
        const product = {
            name: 'Sauce Labs Backpack'
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await header.clickShoppingCartLink()
        await cart.expectCartPage()
        await expect(header.locatorShoppingCartBadge).toHaveCount(1)
    })

    test('Retirer tous les produits du panier et vérifier que le panier est vide', async ({header,inventory,cart}) => {
        //Arrange
        const products = [
            { name: 'Sauce Labs Backpack' },
            { name: 'Sauce Labs Bike Light' },
            { name: 'Sauce Labs Bolt T-Shirt' }];
        //Act
        await inventory.addProductsToCart(products)
        await header.clickShoppingCartLink()
        await cart.expectCartPage()
        //Assert
        const badgeCount = await header.getCurrentCartCount();
        await expect(badgeCount).toBe(3);
        await cart.deleteAllProducts()
        await expect(header.locatorShoppingCartBadge).toBeHidden()
    })
        
    test('Cliquer sur "Continuer les achats" et vérifier le retour à la page d\'inventaire', async ({cart,inventory,header}) => {
        //Act
        await header.clickShoppingCartLink()
        await cart.expectCartPage()
        await cart.clickContinueShopping()
        //Assert
        await inventory.expectInventoryPage()
    })
        
    test('Cliquer sur "Paiement" et vérifier l\'affichage de la page de paiement', async ({inventory,cart,checkout}) => {
        //Arrange
        const product = {
            name:'Sauce Labs Fleece Jacket'
        }
        //Act
        await inventory.addOneProductToCart(product.name)
        await inventory.header.clickShoppingCartLink()
        await cart.expectCartPage()
        await cart.clickCheckoutButton()
        //Assert
        await checkout.one.expectCheckoutStepOnePage()
    })
});


