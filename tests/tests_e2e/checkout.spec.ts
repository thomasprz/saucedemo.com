import {test,expect} from '../../fixtures/base.fixture'
import { checkoutInformationFaker } from '../../factory/checkout.factory'
import data from '../../data/checkout.data.json'

test.describe('Paiement', () => {
    test.beforeEach('Naviguer vers la page inventaire', async ({inventory}) => {
        await inventory.goTo('/inventory.html')
        await inventory.expectInventoryPage()
    })

    test('Finaliser la commande et retourner à l\'accueil', async ({inventory, cart, checkout}) => {
        //Arrange
        const productData = {
            name:'Sauce Labs Fleece Jacket',
            price : 49.99
        }
        const informationData = checkoutInformationFaker()
        //Act
        await inventory.addOneProductToCart(productData.name)
        await inventory.header.clickShoppingCartLink()
        await cart.expectCartPage()
        await cart.expectProductInCart(productData)
        await cart.clickCheckoutButton()
        await checkout.one.expectCheckoutStepOnePage()
        await checkout.one.fillCheckoutForm(informationData)
        await checkout.two.expectCheckoutStepTwoPage()
        await checkout.two.clickFinish()
        //Assert
        await checkout.complete.expectCheckoutCompletePage()
        await expect(checkout.complete.locatorSuccessMessage).toBeVisible()
        await checkout.complete.clickBackHome()
        await inventory.expectInventoryPage()
        })
    
    test('Ne pas autoriser la finalisation de la commande avec un formulaire vide', async ({inventory, cart, checkout}) => {
        //Act
        await inventory.header.clickShoppingCartLink()
        await cart.expectCartPage()
        await cart.clickCheckoutButton()
        await checkout.one.expectCheckoutStepOnePage()
        await checkout.one.clickContinue()
        //Assert
        await expect(checkout.one.locatorErrorMessage).toHaveText(data.empty_credentials)
    })

    test('Ne pas autoriser la finalisation de la commande avec le champ prénom vide', async ({inventory, cart, checkout}) => {
        //Arrange
        const informationData = checkoutInformationFaker()
        //Act
        await inventory.header.clickShoppingCartLink()
        await cart.expectCartPage()
        await cart.clickCheckoutButton()
        await checkout.one.expectCheckoutStepOnePage()
        await checkout.one.fillLastName(informationData.lastname)
        await checkout.one.fillZipCode(informationData.zipcode)
        await checkout.one.clickContinue()
        //Assert
        await expect(checkout.one.locatorErrorMessage).toHaveText(data.empty_firstname)
    })


    test('Ne pas autoriser la finalisation de la commande avec le champ nom vide', async ({inventory, cart, checkout}) => {
        //Arrange
        const informationData = checkoutInformationFaker()
        //Act
        await inventory.header.clickShoppingCartLink()
        await cart.expectCartPage()
        await cart.clickCheckoutButton()
        await checkout.one.expectCheckoutStepOnePage()
        await checkout.one.fillFirstName(informationData.firstname)
        await checkout.one.fillZipCode(informationData.zipcode)
        await checkout.one.clickContinue()
        //Assert
        await expect(checkout.one.locatorErrorMessage).toHaveText(data.empty_lastname)
    })

    test('Ne pas autoriser la finalisation de la commande avec le champ code postal vide', async ({inventory, cart, checkout}) => {
        //Arrange
        const informationData = checkoutInformationFaker()
        //Act
        await inventory.header.clickShoppingCartLink()
        await cart.expectCartPage()
        await cart.clickCheckoutButton()
        await checkout.one.expectCheckoutStepOnePage()
        await checkout.one.fillFirstName(informationData.firstname)
        await checkout.one.fillLastName(informationData.lastname)
        await checkout.one.clickContinue()
        //Assert
        await expect(checkout.one.locatorErrorMessage).toHaveText(data.empty_zipcode)
    })

    test('Annuler la commande à l\'étape de saisie des informations', async ({inventory, cart, checkout}) => {
         //Act
         await inventory.header.clickShoppingCartLink()
         await cart.expectCartPage()
         await cart.clickCheckoutButton()
         await checkout.one.expectCheckoutStepOnePage()
         //Assert
         await checkout.one.clickCancel()
         await cart.expectCartPage()
    })

    test('Annuler la commande à l\'étape de récapitulatif de la commande', async ({inventory, cart, checkout}) => {
        //Arrange
        const informationData = checkoutInformationFaker()
        //Act
        await inventory.header.clickShoppingCartLink()
        await cart.expectCartPage()
        await cart.clickCheckoutButton()
        await checkout.one.expectCheckoutStepOnePage()
        await checkout.one.fillCheckoutForm(informationData)
        await checkout.two.expectCheckoutStepTwoPage()
        await checkout.two.clickCancel()
        //Assert
        await inventory.expectInventoryPage()
        
    })
})