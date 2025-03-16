import { components } from "./components.fixture";
import { pages } from "./pages.fixture";
import { mergeTests } from "playwright/test";
export {expect} from '@playwright/test'

export const test = mergeTests(components,pages)
