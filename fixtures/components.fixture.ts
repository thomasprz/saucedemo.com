import { FooterComponent } from "../components/footer.component";
import {test as componentsTest } from '@playwright/test'
import { SidebarComponent } from "../components/sidebar.component";

interface Components {
    footer : FooterComponent
    sidebar : SidebarComponent
}

export const components = componentsTest.extend<Components>({
    footer : async ({page}, use) => {
        await use(new FooterComponent(page))
    },
    sidebar: async({page}, use) => {
        await use(new SidebarComponent(page))
    },

})