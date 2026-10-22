import { BasePage } from './base-page';

export class ImportPage extends BasePage {
  async complete(imported: boolean, country: string): Promise<void> {
    await this.assertPageTitle();
    await this.choose(imported ? 'Yes' : 'No');
    if (imported) await this.type(this.page.locator('#import-country'), country);
    await this.continue();
  }
}