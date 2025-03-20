import {test as componentsTest} from '@playwright/test'
import { HeaderComponent } from '../components/header.component'
import { SidebarComponent } from '../components/sidebar.component'

interface Components {
    header: HeaderComponent
    sidebar : SidebarComponent
}

export const components = componentsTest.extend<Components>({

    header: async({page}, use) => {
        await use(new HeaderComponent(page))
    },
    sidebar: async ({page}, use) => {
        await use(new SidebarComponent(page))
    }
})