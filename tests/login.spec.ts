import {test,expect} from '../fixtures/base.fixture'

test.describe('Connexion', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test.beforeEach('Naviguer vers la page de connexion', async ({login}) => {
        await login.goTo()
        await login.expectLoginPage()
    })

    test("Connexion avec l\'utilisateur 'standard_user'", async ({login}) => {
        //Arrange

        //Act
        await login.fillLoginForm
        //Assert


    })
})