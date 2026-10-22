import { BasePage } from './base-page';

export class OrganisationPage extends BasePage {
  async complete(organisation: string, fields: Record<string, string>): Promise<void> {
    await this.assertPageTitle();
    await this.choose(organisation);
    for (const [fieldId, value] of Object.entries(fields)) {
      await this.type(this.page.locator(`#${fieldId}`), value);
    }
    await this.continue();
  }
}