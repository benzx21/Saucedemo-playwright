import { test, expect } from '@fixtures/index';
import { products } from '@data/users';

test.describe('Cart', () => {
  test('added items appear in the cart @smoke', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.onesie);
    await inventoryPage.openCart();
    expect(await cartPage.getItemNames()).toEqual([products.backpack, products.onesie]);
  });

  test('item can be removed from the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.remove(products.backpack);
    await expect(cartPage.items).toHaveCount(0);
  });
});
