import {test,expect} from '../fixtures/base.fixture'
import data from '../data/inventory.data.json'

test.describe('Connexion', () => {
    test.beforeEach('Naviguer vers la page inventaire', async ({inventory}) => {
        await inventory.goTo('/inventory.html')
        await inventory.expectInventoryPage()
    })
        test("Trier les noms des produits par ordre alphabétique (de A à Z)", async ({ inventory }) => {
        // Arrange
        const expectedSortedList = data.az;
        // Act
        await inventory.sortBy('az'); // Appliquer le tri
        const products = await inventory.sortProducts(); // Récupérer la liste triée
        // Assert
        await expect(products).toEqual(expectedSortedList);
        });

        test("Trier les noms des produits par ordre alphabétique inverse (de Z à A)", async ({home,inventory }) => {
        // Arrange
        const expectedSortedList = data.za;
        // Act
        await inventory.sortBy('za');
        const products = await inventory.sortProducts(); 
        // Assert
        await expect(products).toEqual(expectedSortedList);
        });

        test("Trier les produits par prix croissant", async ({home,inventory }) => {
        // Arrange
        const expectedSortedList = data.lohi;
        // Act
        await inventory.sortBy('lohi');
        const products = await inventory.sortProducts();
        // Assert
        await expect(products).toEqual(expectedSortedList);
        });

        test("Trier les produits par prix décroissant", async ({home,inventory }) => {
        // Arrange
        const expectedSortedList = data.hilo;
        // Act
        await inventory.sortBy('hilo'); 
        const products = await inventory.sortProducts(); 
        // Assert
        await expect(products).toEqual(expectedSortedList);
        });

        test('Ajouter un produit au panier et le supprimer', async ({inventory,header,page}) => {
        //Act
        await inventory.addProductToCart(0)
        await expect(header.locatorShoppingCartBadge).toHaveCount(1)
        await inventory.removeProduct(0)
        //Assert
        await expect(header.locatorShoppingCartBadge).toBeHidden()        
        })
});


