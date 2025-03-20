import { Configuration } from '../../configuration/configuration';
import {test,expect} from '../../fixtures/base.fixture'
import data from '../../data/login.data.json'
    
test.describe('Connexion', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test.beforeEach('Naviguer vers la page de connexion', async ({home}) => {
    await home.goTo('/')
    await home.expectLoginPage()
    })
    test("Connexion avec l'utilisateur 'standard_user' ", async ({home,inventory }) => {
        //Act
        await home.fillLoginForm(Configuration.STANDARD_USER, Configuration.PASSWORD)
        await home.clickLoginButton()
        //Assert
        await inventory.expectInventoryPage()
    });
    test("Connexion avec l'utilisateur 'visual_user' ", async ({home,inventory }) => {
        //Act
        await home.fillLoginForm(Configuration.VISUAL_USER, Configuration.PASSWORD)
        await home.clickLoginButton()
        //Assert
        await inventory.expectInventoryPage()
    });
    test("Connexion avec l'utilisateur 'error_user' ", async ({home,inventory }) => {
        //Act
        await home.fillLoginForm(Configuration.ERROR_USER, Configuration.PASSWORD)
        await home.clickLoginButton()
        //Assert
        await inventory.expectInventoryPage()
    });
    
    test("Connexion avec l'utilisateur 'problem_user' ", async ({home,inventory }) => {
        //Act
        await home.fillLoginForm(Configuration.PROBLEM_USER, Configuration.PASSWORD)
        await home.clickLoginButton()
        //Assert
        await inventory.expectInventoryPage()
    });
    test("Connexion avec l'utilisateur 'performance_user' ", async ({home,inventory }) => {
        //Act
        await home.fillLoginForm(Configuration.PERFORMANCE_GLITCH_USER, Configuration.PASSWORD)
        await home.clickLoginButton()
        //Assert
        await inventory.expectInventoryPage()
    });
    test("Connexion avec des identifiants incorrects", async ({home}) => {
        //Arrange
        const errorAlert = data.incorrect_user
        //Act
        await home.fillLoginForm("username", "password")
        await home.clickLoginButton()
        //Assert
        await expect(home.locatorAlertError).toContainText(errorAlert)
    });
    test("Connexion avec un utilisateur bloqué", async ({home }) => {
        //Arrange
        const errorAlert = data.locked_user
        //Act
        await home.fillLoginForm(Configuration.LOCKED_OUT_USER, Configuration.PASSWORD)
        await home.clickLoginButton()
        //Assert
        await expect(home.locatorAlertError).toContainText(errorAlert)
    });

    test("Connexion avec un utilisateur manquant' ", async ({home }) => {
        //Arrange
        const errorAlert = data.empty_username
        //Act
        await home.loginWithoutUsername(Configuration.PASSWORD)
        await home.clickLoginButton()
        //Assert
        await expect(home.locatorAlertError).toContainText(errorAlert)

    });
    test("Connexion avec un mot de passe manquant' ", async ({home }) => {
        //Arrange
        const errorAlert = data.empty_password
        //Act
        await home.loginWithoutPassword('username')
        await home.clickLoginButton()
        //Assert
        await expect(home.locatorAlertError).toContainText(errorAlert)

    });
    test("Connexion avec des identifiants manquants' ", async ({home }) => {
        //Arrange
        const errorAlert = data.empty_credentials
        //Act
        await home.clickLoginButton()
        //Assert
        await expect(home.locatorAlertError).toContainText(errorAlert)
    });
})