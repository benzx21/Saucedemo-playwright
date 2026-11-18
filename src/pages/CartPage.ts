import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  get items() { return this.byTestId('inventory-item'); }
  get checkoutButton() { return this.byTestId('checkout'); }

  async open() {
    await this.goto('/cart.html');
  }

  async getItemNames(): Promise<string[]> {
    return this.byTestId('inventory-item-name').allTextContents();
  }

  async remove(name: string) {
    await this.items.filter({ hasText: name }).getByRole('button', { name: /remove/i }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
