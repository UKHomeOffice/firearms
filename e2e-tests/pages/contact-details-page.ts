import { BasePage } from './base-page';

export class ContactDetailsPage extends BasePage {
  async complete(email: string, phone: string): Promise<void> {
    await this.assertPageTitle();
    await this.type(this.page.locator('input[id$="-email"]'), email);
    await this.type(this.page.locator('input[id$="-phone"]'), phone);
    await this.continue();
  }
}