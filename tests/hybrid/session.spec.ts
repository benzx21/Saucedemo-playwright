import { test, expect } from '@fixtures/index';
import { users } from '@data/users';

// Hybrid: skip the UI login by setting the session cookie directly,
// then verify behaviour through the UI.
test.describe('Hybrid session handling', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('cookie injection logs a user in without the login form', async ({ context, inventoryPage }) => {
    await context.addCookies([
      { name: 'session-username', value: users.standard.username, domain: 'www.saucedemo.com', path: '/' },
    ]);
    await inventoryPage.open();
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('protected page is blocked without a session @smoke', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(loginPage.error).toContainText('when you are logged in');
  });

  test('site responds OK (API level check)', async ({ request }) => {
    const res = await request.get('/');
    expect(res.ok()).toBeTruthy();
  });
});

test.describe('Hybrid network control', () => {
  test('blocking product images does not break the inventory', async ({ page, inventoryPage }) => {
    await page.route('**/*.{jpg,png,svg}', (route) => route.abort());
    await inventoryPage.open();
    await expect(inventoryPage.items).toHaveCount(6);
  });
});
