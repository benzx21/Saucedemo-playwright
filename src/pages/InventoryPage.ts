import { BasePage } from './BasePage';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage extends BasePage {
  get title() { return this.byTestId('title'); }
  get items() { return this.byTestId('inventory-item'); }
  get sortDropdown() { return this.byTestId('product-sort-container'); }

  async open() {
    await this.goto('/inventory.html');
  }

  private item(name: string) {
    return this.items.filter({ hasText: name });
  }

  async addToCart(name: string) {
    await this.item(name).getByRole('button', { name: /add to cart/i }).click();
  }

  async removeFromCart(name: string) {
    await this.item(name).getByRole('button', { name: /remove/i }).click();
  }

  async sortBy(option: SortOption) {
    await this.sortDropdown.selectOption(option);
  }

  async getNames(): Promise<string[]> {
    return this.byTestId('inventory-item-name').allTextContents();
  }

  async getPrices(): Promise<number[]> {
    const raw = await this.byTestId('inventory-item-price').allTextContents();
    return raw.map((p) => parseFloat(p.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }
}
