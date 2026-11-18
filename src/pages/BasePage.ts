import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/') {
    await this.page.goto(path);
  }

  protected byTestId(id: string): Locator {
    return this.page.getByTestId(id);
  }

  get cartBadge(): Locator {
    return this.byTestId('shopping-cart-badge');
  }

  get cartLink(): Locator {
    return this.byTestId('shopping-cart-link');
  }

  async openMenu() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
  }

  async logout() {
    await this.openMenu();
    await this.byTestId('logout-sidebar-link').click();
  }
}
