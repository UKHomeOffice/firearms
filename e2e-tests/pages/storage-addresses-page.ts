import { BasePage } from './base-page';

export class StorageAddressesPage extends BasePage {
  async complete(): Promise<void> {
    await this.assertPageTitle();
    await this.page.locator('input[name="storage-address-range"]').first().check();
    await this.page.locator('input[name="storage-address-secretary"]').first().check();
    await this.continue();
  }
}