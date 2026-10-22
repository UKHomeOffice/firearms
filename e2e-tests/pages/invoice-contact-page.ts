import { BasePage } from './base-page';

export class InvoiceContactPage extends BasePage {
  async complete(email: string, name: string, phone: string): Promise<void> {
    await this.assertPageTitle();
    await this.type(this.page.locator('#invoice-contact-email'), email);
    await this.type(this.page.locator('#invoice-contact-name'), name);
    await this.type(this.page.locator('#invoice-contact-phone'), phone);
    await this.continue();
  }
}