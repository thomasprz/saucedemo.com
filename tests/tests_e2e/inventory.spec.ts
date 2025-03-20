import {test,expect} from '../../fixtures/base.fixture'
import data from '../../data/inventory.data.json'

test.describe('Inventaire', () => {
    test.beforeEach('Naviguer vers la page inventaire', async ({inventory}) => {
        await inventory.goTo('/inventory.html')
        await inventory.expectInventoryPage()
    })
        test("Trier les noms des produits par ordre alphabétique (de A à Z)", async ({inventory }) => {
            // Arrange
            const expectedSortedList = data.az;
            // Act
            await inventory.sortBy('az');
            const products = await inventory.sortProducts();
            // Assert
            await expect(products).toEqual(expectedSortedList);
        });

        test("Trier les noms des produits par ordre alphabétique inverse (de Z à A)", async ({inventory }) => {
            // Arrange
            const expectedSortedList = data.za;
            // Act
            await inventory.sortBy('za');
            const products = await inventory.sortProducts(); 
            // Assert
            await expect(products).toEqual(expectedSortedList);
        });

        test("Trier les produits par prix croissant", async ({inventory }) => {
            // Arrange
            const expectedSortedList = data.lohi;
            // Act
            await inventory.sortBy('lohi');
            const products = await inventory.sortProducts();
            // Assert
            await expect(products).toEqual(expectedSortedList);
        });

        test("Trier les produits par prix décroissant", async ({inventory }) => {
            // Arrange
            const expectedSortedList = data.hilo;
            // Act
            await inventory.sortBy('hilo'); 
            const products = await inventory.sortProducts(); 
            // Assert
            await expect(products).toEqual(expectedSortedList);
        });

        test('Ajouter un produit au panier et le supprimer', async ({inventory,header}) => {
            //Arrange
            const productData = {
                name:'Sauce Labs Onesie'
            }
            //Act
            await inventory.addOneProductToCart(productData.name)
            await expect(header.locatorShoppingCartBadge).toHaveCount(1)
            await inventory.removeProduct(productData.name)
            //Assert
            await expect(header.locatorShoppingCartBadge).toBeHidden()        
        })

        test('Ajouter un produit au panier depuis la page détail d\'un produit vérifier le compteur du panier', async ({inventory,header}) => {
            //Act
            await inventory.clickFirstProductTitle()
            await inventory.item.expectInventoryItemPage()
            await inventory.item.addProductToCart()
            //Assert
            await expect(header.locatorShoppingCartBadge).toHaveCount(1)
        })

        test('Supprimer un produit du panier depuis la page détail d\'un produit et vérifier le compteur du panier', async ({inventory,header}) => {
            //Act
            await inventory.clickFirstProductTitle()
            await inventory.item.expectInventoryItemPage()
            await inventory.item.addProductToCart()
            //Assert
            await expect(header.locatorShoppingCartBadge).toHaveCount(1)
            await inventory.item.removeProduct()
            await expect(header.locatorShoppingCartBadge).toBeHidden()
        })

        test('Retourner à la page inventaire depuis la page détail d\'un produit', async ({inventory}) => {
            //Act
            await inventory.clickFirstProductTitle()
            await inventory.item.expectInventoryItemPage()
            await inventory.item.clickBackToProducts()
            //Assert
            await inventory.expectInventoryPage()
        })
});


