import { test, expect } from '@fixtures/index';
import { users, invalidLogins } from '@data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('valid user can log in @smoke', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  for (const c of invalidLogins) {
    test(`rejects login: ${c.name}`, async ({ loginPage }) => {
      await loginPage.login(c.username, c.password);
      await expect(loginPage.error).toContainText(c.error);
    });
  }

  test('user can log out', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.logout();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});
