import {test as componentsTest} from '@playwright/test'
import { HeaderComponent } from '../components/header.component'

interface Components {
    header: HeaderComponent
}

export const components = componentsTest.extend<Components>({

    header: async({page}, use) => {
        await use(new HeaderComponent(page))
    },
})