import { FooterComponent } from "../components/footer.component";
import {test as componentsTest } from '@playwright/test'

interface Components {
    footer : FooterComponent
}

export const components = componentsTest.extend<Components>({
    footer : async ({page}, use) => {
        await use(new FooterComponent(page))
    },

})