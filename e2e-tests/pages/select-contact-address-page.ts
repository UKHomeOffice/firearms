import { BasePage } from './base-page';

export class SelectContactAddressPage extends BasePage {
  async complete(): Promise<void> {
    await this.assertPageTitle();
    await this.page.locator('input[name="contact-address"]').first().check();
    await this.continue();
  }
}