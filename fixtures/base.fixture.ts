import { mergeTests } from "@playwright/test"; // Fonction permettant de combiner plusieurs fixtures en un seul objet de test.
import { pages } from "./pages.fixture"; //Cette ligne importe la fixture appelée pages depuis pages.fixture.ts
import { components } from "./components.fixture";

export const test = mergeTests(pages, components)
export {expect} from '@playwright/test' //Cette ligne exporte expect et Locator depuis @playwright/test pour simplifier les imports dans les fichiers de test, évitant ainsi de les réimporter à chaque fois.

