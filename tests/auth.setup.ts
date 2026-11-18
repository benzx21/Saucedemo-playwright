import { test as setup, expect } from '@fixtures/index';
import { users } from '@data/users';
import { AUTH_FILE } from '../playwright.config';

setup('authenticate as standard_user', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(inventoryPage.title).toHaveText('Products');
  await page.context().storageState({ path: AUTH_FILE });
});
