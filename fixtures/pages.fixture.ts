import {test as pagesTest} from '@playwright/test'
import { LoginPage } from "../pages/login.page";

interface Pages{
    login : LoginPage
}

export const pages = pagesTest.extend<Pages>({
    
    login: async ({page}, use) => {
        await use(new LoginPage(page))
    },
})

