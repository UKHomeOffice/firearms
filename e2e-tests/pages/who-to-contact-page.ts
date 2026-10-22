import { BasePage } from './base-page';

export class WhoToContactPage extends BasePage {
  async complete(holder: 'first' | 'second' | 'other', name?: string): Promise<void> {
    await this.assertPageTitle();
    await this.page.locator(`#contact-holder-${holder}`).check();
    if (holder === 'other') {
      if (!name) throw new Error('A contact name is required for someone else');
      await this.type(this.page.locator('#someone-else-name'), name);
    }
    await this.continue();
  }
}