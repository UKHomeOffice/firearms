import { BasePage } from './base-page';

export class BusinessStoragePage extends BasePage {
  async complete(storedOnPremises: boolean, details: string): Promise<void> {
    await this.assertPageTitle();
    await this.choose(storedOnPremises ? 'Yes' : 'No');
    if (!storedOnPremises) await this.type(this.page.locator('#no-storage-details'), details);
    await this.continue();
  }
}