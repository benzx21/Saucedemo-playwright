import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  get firstName() { return this.byTestId('firstName'); }
  get lastName() { return this.byTestId('lastName'); }
  get postalCode() { return this.byTestId('postalCode'); }
  get continueButton() { return this.byTestId('continue'); }
  get finishButton() { return this.byTestId('finish'); }
  get error() { return this.byTestId('error'); }
  get subtotal() { return this.byTestId('subtotal-label'); }
  get tax() { return this.byTestId('tax-label'); }
  get total() { return this.byTestId('total-label'); }
  get completeHeader() { return this.byTestId('complete-header'); }

  async fillInfo(info: { firstName: string; lastName: string; postalCode: string }) {
    await this.firstName.fill(info.firstName);
    await this.lastName.fill(info.lastName);
    await this.postalCode.fill(info.postalCode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  /** Reads a label such as "Item total: $39.98" and returns 39.98 */
  async amount(label: 'subtotal' | 'tax' | 'total'): Promise<number> {
    const text = await this[label].innerText();
    return parseFloat(text.match(/\$([\d.]+)/)![1]);
  }
}
