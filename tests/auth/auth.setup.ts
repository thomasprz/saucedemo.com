import {test as setup} from "../../fixtures/base.fixture";

setup('authenticate default user', async({login, page}) => {
  await login.goTo();
  await login.fillLoginForm()
  await page.context().storageState({ path: '.auth/user.json' });
  await page.close();
})