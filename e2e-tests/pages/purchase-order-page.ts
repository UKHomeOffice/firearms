import { BasePage } from './base-page';

export class PurchaseOrderPage extends BasePage {
  async complete(hasOrder: boolean, order: string): Promise<void> {
    await this.assertPageTitle();
    await this.choose(hasOrder ? 'Yes' : 'No');
    if (hasOrder) await this.type(this.page.locator('#purchase-order-number'), order);
    await this.continue();
  }
}