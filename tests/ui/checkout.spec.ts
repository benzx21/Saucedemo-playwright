import { test, expect } from '@fixtures/index';
import { products, checkoutInfo } from '@data/users';

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  test('completes an order end to end @smoke', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo(checkoutInfo);
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('order total equals subtotal plus tax', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo(checkoutInfo);
    const subtotal = await checkoutPage.amount('subtotal');
    const tax = await checkoutPage.amount('tax');
    const total = await checkoutPage.amount('total');
    expect(subtotal).toBeCloseTo(39.98, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  const missing = [
    { field: 'firstName', info: { firstName: '', lastName: 'T', postalCode: '1' }, msg: 'First Name is required' },
    { field: 'lastName', info: { firstName: 'B', lastName: '', postalCode: '1' }, msg: 'Last Name is required' },
    { field: 'postalCode', info: { firstName: 'B', lastName: 'T', postalCode: '' }, msg: 'Postal Code is required' },
  ];

  for (const m of missing) {
    test(`validates missing ${m.field}`, async ({ checkoutPage }) => {
      await checkoutPage.fillInfo(m.info);
      await expect(checkoutPage.error).toContainText(m.msg);
    });
  }
});
